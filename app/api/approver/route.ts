import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl;

  const searchParams = new URLSearchParams(url.search);
  const id = searchParams.get("approver") ?? "";

  const approverName = await prisma.user.findUnique({
    where: {
      id: id,
    },

    select: {
      fullName: true,
    },
  });

  return NextResponse.json({ name: approverName });
}
