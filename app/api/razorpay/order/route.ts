import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

// Check that the environment variables are defined
if (!process.env.NEXT_PUBLIC_RAZORPAY_SECRET_ID || !process.env.NEXT_PUBLIC_RAZORPAY_KEY) {
  throw new Error("Razorpay environment variables are not set");
}

var instance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_SECRET_ID!,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await req.json();
    const orderReq = await instance.orders.create({
      amount: data.price * 100,
      currency: "INR",
      receipt: "receipt#1",
      partial_payment: false,
      notes: {
        userId: userId,
        courseId: data.courseId
      },
    });

    return new NextResponse(JSON.stringify({ orderReq, userId, courseId: data.courseId }), { status: 200 });
  } catch (error) {
    console.log("[Status]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
