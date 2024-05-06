import Image from "next/image";
import prisma from "@/lib/prisma";

async function getPost() {
  const posts = await prisma.post.findMany();

  console.log(posts);
}

export default async function Home() {
  const posts = await getPost();
  console.log(posts);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hi</h1>
    </main>
  );
}
