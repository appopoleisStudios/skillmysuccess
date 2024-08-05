"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import axios from "axios";
import sha256 from "crypto-js/sha256";
import { useRouter } from "next/navigation";
import useRazorpay from "react-razorpay";
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

export const CourseEnrollButton = ({
  price,
  courseId,
}: CourseEnrollButtonProps) => {
  const router = useRouter();
  const [Razorpay] = useRazorpay();

  const handlePayment = (orderId: string) => {
    try {
      const options: any = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_SECRET_ID,
        amount: price * 100,
        currency: "INR",
        name: "SkillMySuccess",
        description: "Test Transaction",
        order_id: orderId,
        handler: function (response : any) {
          console.log(response)
          // api call after success
        },
        prefill: {
          name: "Arsalan",
          email: "youremail@example.com",
          contact: "9999999999",
        },
      };
  
      const rzp1 = new Razorpay(options);
      rzp1.on("payment.failed", function (response : any) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
  
      rzp1.on("payment.success", async function (response: any) {
        console.log(response)
      })
    
      rzp1.open();
    } catch (error) {
      console.log(error)
    }
  };

  const handlePay = async () => {
    try {
      const res = await axios.post("/api/razorpay/order", {
        price,
        courseId,
      });
      if (res.status === 200) {
        console.log(res.data)
        handlePayment(res.data.orderReq.id);
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Button size="sm" onClick={handlePay} className="w-full md:w-auto">
      Enroll for {formatPrice(price)}
    </Button>
  );
};
