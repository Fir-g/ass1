import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

async function getUser() {
  const session = await getServerSession();
  return session;
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);
  const pageNumber = parseInt(url.searchParams.get("pageNumber") || "1", 10);

  const session = await getUser();

  if (session?.user) {
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email ?? "" },
      include: { loans: true },
    });

    const list = await prisma.user.findMany({});

    if (user?.role === "VERIFIER") {
      const loans = await prisma.loan.findMany({
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        orderBy: {
          createdAt: "desc",
        },
      });

      return NextResponse.json({ loans });
    } else {
      return NextResponse.json({ error: "Not Authorized" }, { status: 403 });
    }
  }

  return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
}
