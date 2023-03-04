import Head from "next/head";
import { Inter } from "next/font/google";
import clsx from "clsx";
import {
  TypographyH1,
  TypographyH3,
  TypographyP,
} from "@/components/Typography";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={clsx(inter.className, "p-full")}>
        <div className="flex flex-col items-center gap-4">
          <div className="text-center">
            <TypographyH1>Welcome to GiftGenie</TypographyH1>
            <TypographyH3>Find the Perfect Gift for Anyone</TypographyH3>
          </div>
          <Image src="/gift.jpg" alt="GiftGenie" width={800} height={800} />
        </div>
      </main>
    </>
  );
}
