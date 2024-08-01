"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import axios from "axios";
import sha256 from "crypto-js/sha256";
import { useRouter } from "next/navigation";
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

  const handlePay = () => {
    const opt = {
      merchantId: "PGTESTPAYUAT86",
      merchantTransactionId: "MT7850590068188104",
      merchantUserId: "MUID123",
      amount: price * 100,
      redirectUrl:
        "http://localhost:3000/courses/9bd14000-e899-4db1-99b2-7af12d398455/chapters/b472dc01-ef6e-48f5-b89f-4f36a9f9b1b4",
      redirectMode: "POST",
      callbackUrl:
        "http://localhost:3000/api/status/MT7850590068188104",
      mobileNumber: "9999999999",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };
    const dataPayload = JSON.stringify(opt);

    const dataBase64 = Buffer.from(dataPayload).toString("base64");
    let string =
      dataBase64 + "/pg/v1/pay" + "96434309-7796-489d-8924-ab56988a6076";
    let sha256_val = sha256(string);
    let xVerifyChecksum = sha256_val + "###" + "1";
    const options = {
      method: "post",
      url: "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": xVerifyChecksum,
      },
      data: JSON.stringify(opt),
    };
    axios
      .post(
        options.url,
        {
          request: dataBase64,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-VERIFY": xVerifyChecksum,
          },
        }
      )
      .then(function (response) {
        const url = response.data.data.instrumentResponse.redirectInfo.url;
        router.push(url);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <Button size="sm" onClick={handlePay} className="w-full md:w-auto">
      Enroll for {formatPrice(price)}
    </Button>
  );
};
