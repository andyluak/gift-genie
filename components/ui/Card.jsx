import React from "react";
import { TypographyH3, TypographyP } from "../Typography";
import Link from "next/link";

const Card = ({id, fullName, relationship, hobbies}) => {
  //hobbies is a string of comma separated values

  return (
    <Link
      href={`/dashboard/${id}`}
      className="card p-7 bg-slate-100 w-[250px] shadow-lg"
    >
      <div className="space-y-4">
        <TypographyH3>{fullName}</TypographyH3>
        <TypographyP className="mt-0">
          Relationship - {relationship}
        </TypographyP>
        <TypographyP>Hobbies</TypographyP>
        <ul className="flex flex-row flex-wrap gap-2">
          {hobbies.split(',').map((hobby) => (
            <li className="bg-blue-100 p-2 select-none" key={hobby}>
              {hobby}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
};

export default Card;
