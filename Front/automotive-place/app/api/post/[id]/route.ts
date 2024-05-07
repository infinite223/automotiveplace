import { NextRequest, NextResponse } from "next/server";

export function DELETE(request: NextRequest, {params}: {params: {id: string}}) {
    const id = params.id;

    console.log(id, "elo")

    return NextResponse.json(request)
}