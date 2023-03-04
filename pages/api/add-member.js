import { prisma } from "@/db/client";

export default async function handler(req, res) {
  const { fullName, relationship, gender, age, hobbies } = req.body;

  const member = await prisma.member.create({
    data: {
      fullName,
      relationship,
      gender,
      age: parseInt(age),
      hobbies: hobbies
        .map((hobby) => {
          return hobby.value;
        })
        .join(","),
    },
  });

  res.status(200).json({ member });
}
