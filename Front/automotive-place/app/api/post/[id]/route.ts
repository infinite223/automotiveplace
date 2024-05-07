import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export function DELETE(request: NextRequest, {params}: {params: {id: string}}) {
    const id = params.id;

    return NextResponse.json(request)
}