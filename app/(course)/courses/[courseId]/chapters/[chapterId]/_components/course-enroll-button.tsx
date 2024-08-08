"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import axios from "axios";
import { useRouter } from "next/navigation";
import useRazorpay from "react-razorpay";
import { useState } from "react";
import toast from "react-hot-toast";

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
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = (orderId: string, userId: string, courseId: string) => {
    try {
      const options: any = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_SECRET_ID,
        amount: price * 100,
        currency: "INR",
        name: "SkillMySuccess",
        description: "Test Transaction",
        order_id: orderId,
        handler: async function (response: any) {
          console.log(response);
          // API call after success
          try {
            await axios.post("/api/razorpay/purchase", {
              userId,
              courseId,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
            });
            toast.success("Payment successful!");
            router.refresh(); // Refresh page or redirect after success
          } catch (error) {
            toast.error("Failed to save payment data");
            console.error(error);
          }
        },
        prefill: {
          name: "Arsalan",
          email: "youremail@example.com",
          contact: "9999999999",
        },
      };
  
      const rzp1 = new Razorpay(options);
      rzp1.on("payment.failed", function (response: any) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
  
      rzp1.open();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePay = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/razorpay/order", {
        price,
        courseId,
      });
      if (res.status === 200) {
        const { orderReq, userId, courseId } = res.data;
        if (orderReq && userId && courseId) {
          handlePayment(orderReq.id, userId, courseId);
        } else {
          toast.error("Failed to retrieve order details");
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button size="sm" onClick={handlePay} className="w-full md:w-auto" disabled={isLoading}>
      Enroll for {formatPrice(price)}
    </Button>
  );
};
