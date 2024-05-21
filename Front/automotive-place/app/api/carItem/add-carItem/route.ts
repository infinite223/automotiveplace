import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validCarElement } from './../../../components/createCarItem/Validation';
import { TCarItemCreate } from "@/app/utils/types";

export async function POST(request: NextRequest) {
  const authUser = false; 
  const carItem: TCarItemCreate = await request.json()
  let result = {}

  const author = await prisma.user.findFirst()
  const project = await prisma.project.findFirst()
  console.log(author?.id && project?.id)

  if(author?.id && project?.id) {
    result = await prisma.carItem.create({
      data: { ...carItem, authorId: author?.id, projectId: project?.id, likesCount: 0 }
    });

  }
 

  if (authUser && validCarElement(carItem)) {
    
  }
  
   return NextResponse.json(result)
}
