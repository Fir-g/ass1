import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

async function getUser() {
  const session = await getServerSession();
  return session;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const session = await getUser();

  if (session?.user) {
    const user = await prisma.user.findFirst({
      where: {
        email: session?.user?.email ?? "",
      },
      include: {
        loans: true,
      },
    });
    const empStatus = body.job === "Employed";
    const amount = parseInt(body.amount);
    const userId = user?.id;

    const newLoan = await prisma.loan.create({
      data: {
        userId: userId ?? "",
        fullName: body.name,
        amount: amount,
        tenure: body.time,
        reason: body.reason,
        employmentStatus: empStatus,
        employmentAddress: body.addr,
        status: "PENDING",
        approver: "",
      },
    });

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        loans: { connect: { id: newLoan?.id } },
      },
      include: { loans: true },
    });

  }

  return NextResponse.json({
    message: "Loan request submitted successfully!",
  });
}
