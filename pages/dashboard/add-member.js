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
import React from "react";

const AddMember = () => {
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
      <form className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8 md:w-2/3">
        <div className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            className="border-gray-300"
            placeholder="Enter your full name"
          />
        </div>
        <div className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="age">Age</Label>
          <Input id="age" type="number" placeholder={"Age"} defaultValue={20} />
        </div>
        <div className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="gender">Gender</Label>
          <Select id="gender">
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
            type="text"
            className="border-gray-300"
            placeholder="Enter your relationship"
          />
        </div>
        <div className="space-y-2 col-span-2">
          <Label htmlFor="Hobbies">Hobbies</Label>
          <CreatableSelect />
        </div>
        <Button type="submit">Add Member</Button>
      </form>
    </main>
  );
};

export default AddMember;
