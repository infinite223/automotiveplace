import { getLoggedInUser } from "@/lib/actions/user.actions";
import { createSessionClient } from "@/lib/server/appwrite";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await getLoggedInUser();

  if (!user) {
    return NextResponse.json(
      { message: "You must be logged in to delete a project" },
      { status: 401 }
    );
  }
  const formData = await req.formData();
  const files = formData.getAll("files") as File[];

  const { storage } = await createSessionClient();

  const uploadedIds: string[] = [];
  for (const file of files) {
    const res = await storage.createFile(
      "67a125f200369445f106",
      crypto.randomUUID(),
      file
    );
    uploadedIds.push(res.$id);
  }

  return NextResponse.json({ fileIds: uploadedIds });
}
