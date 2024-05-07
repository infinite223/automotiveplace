import Image from "next/image";
import prisma from "@/lib/prisma";
import DeletePostButton from "./components/post/DeletePostButton";
import {Post} from "./components/post";

async function getPost() {
  const posts = await prisma.post.findMany();

  console.log(posts);
}

export default async function Home() {
  const posts = await getPost();
  console.log(posts);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>AMP</h1>

      <Post postData={{id: "432da12rfqe12"}} />
    </main>
  );
}
