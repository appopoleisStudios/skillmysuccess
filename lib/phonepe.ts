import PhonepeGateway from "phonepepg";

export const phonepe = new PhonepeGateway({
    merchantId: process.env.PHONEPE_MERCHANT_ID!,
    saltKey: process.env.PHONEPE_SALT_KEY!,
    env: process.env.PHONEPE_ENV!,
});