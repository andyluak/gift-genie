import React from "react";
import { TypographyH3, TypographyP } from "../Typography";
import Link from "next/link";

const Card = ({ id, fullName, relationship, hobbies }) => {
  return (
    <Link
      href={`/dashboard/${id}`}
      className="card p-7 bg-purple-50 w-[300px] h-[250px] shadow-lg hover:shadow-2xl"
    >
      <div className="space-y-4 flex flex-col h-full justify-between">
        <div>
          <TypographyH3>{fullName}</TypographyH3>
          <TypographyP className="mt-0">
            Relationship - {relationship}
          </TypographyP>
        </div>
        <div className="space-y-4">
          <TypographyP className="font-bold">Hobbies</TypographyP>
          <ul className="flex flex-row items-center flex-wrap gap-2">
            {hobbies.split(",").map((hobby, index) => {
              if (index === 2) {
                return (
                  <li
                    className="text-sm text-gray-500 select-none"
                    key={`${hobby}${index}`}
                  >
                    and {hobbies.split(",").length - 3} more
                  </li>
                );
              }
              if (index < 3) {
                return (
                  <li
                    className="bg-blue-100 p-2 select-none"
                    key={`${hobby}${index}`}
                  >
                    {hobby}
                  </li>
                );
              }

              return null;
            })}
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default Card;
