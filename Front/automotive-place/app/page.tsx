import prisma from "@/lib/prisma";
import Link from "next/link";
import {projectsData} from "./utils/data/project";

async function getPost() {
  const posts = await prisma.post.findMany();

  console.log(posts);
}

export default async function Home() {
  const posts = await getPost();
  console.log(projectsData);

  return (
    <main className="flex text-zinc-900 min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-[25px]">AMP</h2>
        <h3 className="text-rose-700 font-extrabold text-[20px]">
          AutoMotive place
        </h3>
      </div>

      <Link href={"/garage"}>
        <div className="border-blue-400 p-2 rounded-sm border">
          Go to garage
        </div>
      </Link>

      <div className="flex flex-col"></div>
    </main>
  );
}
