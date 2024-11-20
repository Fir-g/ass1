import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const searchParams = new URLSearchParams(url.search);
  const role = searchParams.get("role") || "User";
  const id = searchParams.get("id") ?? "";

  if (role == "ADMIN") {
    const updatedLoan = await prisma.loan.update({
      where: {
        id: id,
      },

      data: {
        status: "APPROVED",
      },
    });

    return NextResponse.json({
      message: "Loan status is APPROVED",
    });
  } else {
    return NextResponse.json({
      error: "Not Verified",
      status: 429,
    });
  }
}
