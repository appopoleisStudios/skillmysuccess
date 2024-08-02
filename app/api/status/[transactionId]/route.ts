import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import sha256 from "crypto-js/sha256";
import axios from "axios";

export async function POST(req: Request) {
  try {
    // const { userId } = auth();
    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    const data = await req.formData();

    const status = data.get("code");
    const merchantId = data.get("merchantId");
    const transactionId = data.get("transactionId");

    const st = `/pg/v1/status/${merchantId}/${transactionId}/96434309-7796-489d-8924-ab56988a6076`;

    let sha256_val = sha256(st);
    let xVerifyChecksum = sha256_val + "###" + "1";

    console.log(xVerifyChecksum);

    const options = {
      method: "GET",
      url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${transactionId}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": xVerifyChecksum,
        "X-MERCHANT-ID": merchantId,
      },
    };

    console.log(options);
    //   axios.request(options)
    //     .then(function (response) {

    //         console.log(response)
    //     })
    //     .catch(function (error) {
    //       console.error(error);
    //     });
  } catch (error) {
    console.log("[Status]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
