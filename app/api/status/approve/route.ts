import prisma from "@/lib/prisma";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const searchParams = new URLSearchParams(url.search);

  try {
    const role = searchParams.get("role") || "User";
    const id = searchParams.get("id");

    // Validate input
    if (!id) {
      return NextResponse.json(
        { error: "Loan ID is required" },
        { status: 400 }
      );
    }

    // Strict role comparison (adjust based on your actual role storage)
    if (role !== "ADMIN") {
      return NextResponse.json({ error: "Not Authorized" }, { status: 403 });
    }

    // Perform the update
    const updatedLoan = await prisma.loan.update({
      where: { id },
      data: { status: "APPROVED" },
    });

    return NextResponse.json(
      {
        message: "Loan status is APPROVED",
        loan: updatedLoan,
      },
      { status: 200 }
    );
  } catch (error) {
    if (isDynamicServerError(error)) {
      throw error;
    }

    // Handle potential Prisma errors
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: "Failed to update loan",
          details: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
