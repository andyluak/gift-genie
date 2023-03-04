import { TypographyH1, TypographyP } from "@/components/Typography";
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
import { useRouter } from "next/router";
import React, { useState } from "react";

const AddMember = () => {
  const router = useRouter();
  const [gender, setGender] = useState(false);
  const [hobbies, setHobbies] = useState([]);

  const onAddMember = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form);

    const { age, fullName, relationship } = formData;

    try {
      const response = await fetch("/api/add-member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ age, fullName, relationship, gender, hobbies }),
      } );
      
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }

    
  };

  return (
    <main className="p-full space-y-8 md:space-y-16">
      <div>
        <TypographyH1>Add new member</TypographyH1>
        <TypographyP>
          {
            "This page is where you can create a new member for your GiftGenie account. Simply fill out the form below with the member's information."
          }
        </TypographyP>
      </div>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8 md:w-2/3"
        onSubmit={onAddMember}
      >
        <div className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            className="border-gray-300"
            placeholder="Enter your full name"
          />
        </div>
        <div className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            placeholder={"Age"}
            defaultValue={20}
            name="age"
          />
        </div>
        <div className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="gender">Gender</Label>
          <Select
            id="gender"
            value={gender}
            onValueChange={(e) => {
              setGender(e);
            }}
          >
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
        <div className="space-y-2">
          <Label htmlFor="relationship">Relationship with member</Label>
          <Input
            id="relationship"
            name="relationship"
            type="text"
            className="border-gray-300"
            placeholder="Enter your relationship"
          />
        </div>
        <div className="space-y-2 col-span-2">
          <Label htmlFor="Hobbies">Hobbies</Label>
          <CreatableSelect values={hobbies} onChange={(e) => 
            setHobbies(e) 
          }/>
        </div>
        <Button type="submit">Add Member</Button>
      </form>
    </main>
  );
};

export default AddMember;
