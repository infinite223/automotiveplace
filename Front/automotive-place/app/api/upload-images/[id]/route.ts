import { getLoggedInUser } from "@/lib/actions/user.actions";
import prisma from "@/lib/prisma";
import { createSessionClient } from "@/lib/server/appwrite";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const user = await getLoggedInUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id: projectId } = await context.params;

  const formData = await req.formData();
  const files = formData.getAll("files") as File[];
  const stageNumberStr = formData.get("stageNumber") as string | null;
  const stageNumber = stageNumberStr ? parseInt(stageNumberStr) : undefined;

  const visualModificationId = formData.get("visualModificationId") as
    | string
    | null;
  console.log(
    {
      projectId,
      files,
      stageNumber,
      visualModificationId,
    },
    "test",
  );
  if (!files.length) {
    return NextResponse.json({ success: false, message: "No files provided" });
  }

  const { storage } = await createSessionClient();
  const mediaRecords = [];

  for (const file of files) {
    const uploaded = await storage.createFile(
      "67a125f200369445f106",
      crypto.randomUUID(),
      file,
    );

    mediaRecords.push({
      fileName: file.name,
      fileLocation: uploaded.$id,
    });
  }

  await prisma.media.createMany({
    data: mediaRecords.map((m) => ({
      fileName: m.fileName,
      fileLocation: m.fileLocation,
      projectId: projectId,
      isVerified: true,
      ...(visualModificationId && { visualModificationId }),
    })),
  });

  if (visualModificationId) {
  } else if (stageNumber !== undefined) {
    await prisma.stage.updateMany({
      where: { projectId, stageNumber },
      data: { chartImageUrl: mediaRecords[0]?.fileLocation ?? "" },
    });
  } else {
    await prisma.project.update({
      where: { id: projectId },
      data: {
        imagesCount: { increment: mediaRecords.length },
        imagesUrl: mediaRecords[0]?.fileLocation ?? "",
      },
    });
  }

  return NextResponse.json({ success: true, files: mediaRecords });
}
