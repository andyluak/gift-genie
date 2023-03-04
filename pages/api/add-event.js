import { prisma } from "@/db/client";

export default async function handler(req, res) {
  const {
    ocassion,
    previousGifts,
    giftType,
    date,
    budget,
    suggestedGifts,
    memberId,
  } = req.body;
  console.log(req.body);
  // convert date to SQLLite format
  const formattedDate = new Date(date);

  const member = await prisma.event.create({
    data: {
      ocassion,
      previousGifts,
      giftType,
      date: formattedDate,
      budget,
      suggestedGifts,
      member: {
        connect: {
          id: parseInt(memberId),
        }
      }
    },
  });

  res.status(200).json({ member });
}
