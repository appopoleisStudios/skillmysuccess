import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { userId, courseId, paymentId, orderId, signature } = data;

    if (!userId || !courseId) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    // Create a new purchase entry in the database
    await db.purchase.create({
      data: {
        userId,
        courseId,
        paymentId,
        orderId,
        signature,
      },
    });

    return new NextResponse("Purchase data saved", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
