"use client";

import { redirect } from "next/navigation";

const CheckPaymentLink = () => {
  const paymentLink = localStorage.getItem("paymentLink");

  console.log(paymentLink);

  if (paymentLink) {
    localStorage.removeItem("paymentLink");
    redirect(paymentLink);
  }
  return <></>;
};
export default CheckPaymentLink;
