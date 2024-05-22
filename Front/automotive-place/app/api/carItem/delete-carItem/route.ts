import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { apiErrorMessages } from "../../apiMessages";

export async function DELETE(request: NextRequest) {
  const { searchParams }: any = new URL(request.url);
  const id = searchParams.get("id"); 
  const authUser = false; 
  let result = {}

  if(authUser) {
    result = await prisma.carItem.delete({
      where: {id}
    })
  } else {
    return NextResponse.json({
      message: apiErrorMessages.NOT_PERMISSION
    }, {
      status: 401,
    })
  }

  return NextResponse.json(result)
}
