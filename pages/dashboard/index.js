import {
  TypographyH1,
  TypographyH3,
  TypographyP,
} from "@/components/Typography";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import React from "react";
import mockUser from "@/mock/mockUser.json";
import Card from "@/components/ui/Card";
import { prisma } from "@/db/client";

const Dashboard = ({ members, upcomingEvents }) => {
  if (members.length === 0) {
    return (
      <section className="p-full flex flex-col gap-8">
        <TypographyH1>Dashboard</TypographyH1>
        <div className="flex flex-col gap-2">
          <TypographyP>
            {"Looks like you haven't added any members"}
          </TypographyP>
          <Link href="/dashboard/add-member">
            <Button>Add Member</Button>
          </Link>
        </div>
      </section>
    );
  }

  const { fullName, relationship, hobbies } = members[0];

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString("default", { month: "long" });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  return (
    <main className="md:grid md:grid-cols-4 flex flex-col">
      <section className="p-full space-y-4 md:space-y-8 md:col-span-3">
        <TypographyH1>Your Members</TypographyH1>
        <div className="grid grid-cols-1 gap-12 gap-x-32 md:grid-cols-2 place-content-between">
          {members.map((member) => {
            return (
              <Card
                key={member.id}
                id={member.id}
                fullName={member.fullName}
                relationship={member.relationship}
                hobbies={member.hobbies}
              />
            );
          })}
        </div>
        <Link href="/dashboard/add-member">
          <Button>Add more members</Button>
        </Link>
      </section>
      <aside className="md:border-l-2 md:pl-8 p-full md:p-[inherit]">
        <TypographyH3 className="mb-8">Upcoming Events</TypographyH3>
        {upcomingEvents.length === 0 && (
          <TypographyP>No upcoming events</TypographyP>
        )}
        {upcomingEvents.length > 0 && (
          <div className="space-y-4">
            {upcomingEvents.map((event) => {
              return (
                <div key={event.id}>
                  <TypographyP className="font-bold">
                    {event.member.fullName} {event.ocassion}
                  </TypographyP>
                  <TypographyP className="text-sm">
                    {formatDate(event.date)}
                  </TypographyP>
                </div>
              );
            })}
          </div>
        )}
      </aside>
    </main>
  );
};

export async function getServerSideProps(context) {
  const members = await prisma.member.findMany();
  const events = await prisma.event.findMany({
    select: {
      member: true,
      ocassion: true,
      date: true,
    },
  });
  return {
    props: {
      members,
      upcomingEvents: events,
    },
  };
}
export default Dashboard;
