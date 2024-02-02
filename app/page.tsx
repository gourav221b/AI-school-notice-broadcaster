import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-start ">
      Welcome to school notice center.

      <Link href={'/notice'} className="font-bold underline"> See all notice</Link>
      <Link href={'/notice/new'} className="font-bold underline"> Create a new notice</Link>
      <Link href={'/calls'} className="font-bold underline"> Check call status</Link>

    </main>
  );
}
