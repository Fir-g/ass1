import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const searchParams = new URLSearchParams(url.search);
  const role = searchParams.get("role") || "User";
  const id = searchParams.get("id") ?? "";


  if (role == "VERIFIER") {
    const updatedLoan = await prisma.loan.update({
      where: {
        id: id,
      },

      data: {
        status: "REJECTED",
      },
    });

    return NextResponse.json({
      message: "Loan status is REJECTED",
    });
  } else {
    return NextResponse.json({
      error: "Not Verified",
      status: 403,
    });
  }
}
