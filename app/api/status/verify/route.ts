import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const session = await getServerSession();
  const userEmail = session?.user?.email

  const searchParams = new URLSearchParams(url.search);
  const role = searchParams.get("role") || "User";
  const id = searchParams.get("id") ?? "";

  if (role == "VERIFIER") {
    const approverName = await prisma.user.findUnique({
      where: {
        email: userEmail ?? "",
      },
      select: {
        fullName: true,
      },
    });    

    const updatedLoan = await prisma.loan.update({
      where: {
        id: id,
      },

      data: {
        status: "VERIFIED",
        approver: approverName?.fullName,
      },
    });


    return NextResponse.json({
      message: "Loan status is VERIFIED",
    });
  } else if (role == "Admin") {
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
