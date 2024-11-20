import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

async function getUser() {
  const session = await getServerSession();
  return session;
}
export async function GET() {
  const session = await getUser();

  if (session?.user) {
    const user = await prisma.user.findFirst({
      where: {
        email: session.user?.email ?? "",
      },
      select: {
        fullName: true,
      },
    });

    return NextResponse.json({
      name: user?.fullName,
    });
  } else {
    return NextResponse.json({ error: "Not Authorized" }, { status: 403 });
  }
}
