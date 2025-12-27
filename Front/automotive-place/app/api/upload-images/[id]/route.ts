import { getLoggedInUser } from "@/lib/actions/user.actions";
import prisma from "@/lib/prisma";
import { createSessionClient } from "@/lib/server/appwrite";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getLoggedInUser();
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const files = formData.getAll("files") as File[];

  const { storage } = await createSessionClient();

  const mediaRecords = [];

  for (const file of files) {
    const uploaded = await storage.createFile(
      "67a125f200369445f106",
      crypto.randomUUID(),
      file
    );

    mediaRecords.push({
      fileName: file.name,
      fileLocation: uploaded.$id,
      projectId: params.id,
      isVerified: true,
    });
  }

  await prisma.media.createMany({
    data: mediaRecords,
  });

  await prisma.project.update({
    where: { id: params.id },
    data: {
      imagesCount: mediaRecords.length,
      imagesUrl: mediaRecords[0]?.fileLocation ?? "",
    },
  });

  return NextResponse.json({ success: true });
}
