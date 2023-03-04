import {
  TypographyH1,
  TypographyH3,
  TypographyP,
} from "@/components/Typography";
import { Button } from "@/components/ui/Button";
import CreatableSelect from "@/components/ui/CreatableSelect";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Slider } from "@/components/ui/Slider";
import { prisma } from "@/db/client";
import mockUser from "@/mock/mockUser.json";
import { Configuration, OpenAIApi } from "openai";
import React, { useState } from "react";

const IndividualMember = ({ member, upcomingEvents }) => {
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [budgetValue, setBudgetValue] = useState(100);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedGifts, setGeneratedGifts] = useState([]);
  const { fullName, relationship, hobbies, age, gender } = member;

  const formattedHobbies = hobbies.split(',').map((hobby) => {
    return { value: hobby, label: hobby };
  });

  const generateCompletion = async (e) => {
    e.preventDefault();
    console.log(e);
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form);

    const { giftType, previousGifts, ocassion } = formData;

    const joinedHobbies = hobbies.join(", ");

    const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    const configuration = new Configuration({
      apiKey: API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const MODEL = "text-davinci-003";
    const MAX_TOKENS = 400;
    const TEMPERATURE = 0.7;
    const TOP_P = 1;
    const FREQUENCY_PENALTY = 0;
    const PRESENCE_PENALTY = 0;

    const prompt = `
    PROMPT: 
    Return a list of 5 perfect gifts based on the information I provide. All gifts must be findable on amazon and with the brand also. I want to be able to copy the name and find it AND must be within the budget. Return the response in JSON format.
    Here is the information you will need to complete the task:
    * Name: ${fullName}
    * Age: ${age}
    * Gender: ${gender}
    * Hobbies and likes: ${joinedHobbies}
    * Previous gifts received: ${previousGifts}
    * Gift type: ${giftType}
    * Budget: $${budgetValue}

    EXAMPLE OUTPUT: 

    "[{"gift": "Book about video games”,"estimatedPrice" : 10.99}]"

    OUTPUT WITHIN BUDGET IN JSON CONDENSED FORMAT WITH BRAND IN THE NAME:
    `;
    setIsGenerating(true);
    const response = await openai.createCompletion({
      model: MODEL,
      prompt: prompt,
      temperature: TEMPERATURE,
      max_tokens: MAX_TOKENS,
      top_p: TOP_P,
      frequency_penalty: FREQUENCY_PENALTY,
      presence_penalty: PRESENCE_PENALTY,
    });

    const { data } = response;
    const { choices } = data;
    const { text } = choices[0];
    console.log(JSON.parse(`${text}`));
    setGeneratedGifts(JSON.parse(`${text}`));
    setIsGenerating(false);
  };

  const generateSimilarGifts = async (e, gift) => {
    const excludedGifts = generatedGifts
      .filter((prevGift) => prevGift.gift !== gift)
      .map((prevGift) => prevGift.gift)
      .join(", ");
    const prompt = `
    PROMPT: 
    Return a list of 5 perfect gifts based on the information I provide. All gifts must be findable on amazon and with the brand also. I want to be able to copy the name and find it AND must be within the budget. Return the response in JSON format.
    Here is the information you will need to complete the task:
    * Similar gifts to suggest: ${gift}

    EXAMPLE OUTPUT: 

    [{"gift": "Book about video games”,"estimatedPrice" : 10.99}]

    OUTPUT WITHIN BUDGET IN JSON CONDENSED FORMAT:
    `;

    const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    const configuration = new Configuration({
      apiKey: API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const MODEL = "text-davinci-003";
    const MAX_TOKENS = 400;
    const TEMPERATURE = 0.7;
    const TOP_P = 1;
    const FREQUENCY_PENALTY = 0;
    const PRESENCE_PENALTY = 0;

    const response = await openai.createCompletion({
      model: MODEL,
      prompt: prompt,
      temperature: TEMPERATURE,
      max_tokens: MAX_TOKENS,
      top_p: TOP_P,
      frequency_penalty: FREQUENCY_PENALTY,
      presence_penalty: PRESENCE_PENALTY,
    });

    const { data } = response;
    const { choices } = data;
    const { text } = choices[0];
    console.log(JSON.parse(`${text}`));
    setGeneratedGifts((prev) => [...prev, ...JSON.parse(`${text}`)]);
    setIsGenerating(false);
  };

  return (
    <main>
      <section className="p-full flex flex-col gap-8">
        <div className="space-y-2">
          <TypographyH1>{fullName}</TypographyH1>
          <TypographyH3>
            {relationship}, {age} years old
          </TypographyH3>
        </div>
        <div className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="gender">Gender</Label>
          <Select id="gender" defaultValue={gender}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select your gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="undisclosed">{"Don't want to say"}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 col-span-2">
          <Label htmlFor="Hobbies">Hobbies</Label>
          <CreatableSelect values={formattedHobbies} />
        </div>
      </section>

      {upcomingEvents.length === 0 && (
        <section className="p-full flex flex-col gap-8">
          <TypographyH3>{fullName} has no upcoming events</TypographyH3>
        </section>
      )}
      {upcomingEvents.length > 0 && (
        <section className="p-full flex flex-col gap-8"></section>
      )}
      <div className="p-full">
        <Button
          onClick={() => setIsAddingEvent(!isAddingEvent)}
          className="self-start"
        >
          Add Event
        </Button>
      </div>
      {isAddingEvent && (
        <form
          className="p-full grid grid-cols-1 md:grid-cols-2 gap-8"
          onSubmit={generateCompletion}
        >
          <div className="space-y-2 col-span-2 md:col-span-1">
            <Label htmlFor="ocassion">Ocassion for gift</Label>
            <Input
              id="ocassion"
              name="ocassion"
              type="text"
              className="border-gray-300"
              placeholder="Ocassion for gift"
            />
          </div>
          <div className="space-y-2 col-span-2 md:col-span-1">
            <Label htmlFor="previousGifts">Previous Gifts</Label>
            <Input
              id="previousGifts"
              name="previousGifts"
              type="text"
              className="border-gray-300"
              placeholder="Previous gifts received over the years"
            />
          </div>
          <div className="space-y-2 col-span-2 md:col-span-1">
            <Label htmlFor="giftType">Gift Type</Label>
            <Input
              id="giftType"
              name="giftType"
              type="text"
              className="border-gray-300"
              placeholder="Romantic, fun or why not both?"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              className="border-gray-300"
              placeholder="Romantic, fun or why not both?"
            />
          </div>
          <div className="space-y-2 col-span-2 md:col-span-1">
            <Label htmlFor="budget">
              <p className="flex flex-row justify-between">
                Budget <span>${budgetValue}</span>
              </p>
            </Label>
            <Slider
              onValueChange={(e) => {
                setBudgetValue(e[0]);
              }}
              value={[budgetValue]}
              max={5000}
              min={1}
              step={1}
            />
          </div>
          <Button
            disabled={isGenerating ? true : false}
            className="w-fit col-span-2"
          >
            Give me ideas!
          </Button>
        </form>
      )}
      {generatedGifts.length > 0 && (
        <section className="p-full flex flex-col gap-8">
          <TypographyH3>Here are some ideas for {fullName}</TypographyH3>
          <ul className="space-y-8 md:space-y-4">
            {generatedGifts.map((gift) => (
              <div
                key={gift.gift}
                className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4"
              >
                <li className="p-2 w-full rounded-lg flex flex-col bg-amber-200">
                  <p>{gift.gift}</p>
                  <p className="font-bold">{gift.estimatedPrice}</p>
                </li>
                <Button
                  onClick={(e) => generateSimilarGifts(e, gift.gift)}
                  className="self-start md:self-center md:py-8 md:text-base  md:w-[300px]"
                >
                  Give me more similar ideas
                </Button>
              </div>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
};

export async function getServerSideProps(context) {
  // get the id from the url
  const { id } = context.query;
  const member = await prisma.member.findUnique({ where: { id: 1 } });
  return {
    props: {
      member,
      upcomingEvents: [],
    },
  };
}

export default IndividualMember;
