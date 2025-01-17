"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePaymentLink } from "@/lib/features/PaymentContext";
import { Check } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

type PricingCardProps = {
  tier: string;
  price: number;
  period: "forever" | "monthly" | "yearly";
  paymentLink: string;
  features: string[];
};

const PricingCard = ({
  tier,
  price,
  period,
  features,
  paymentLink,
}: PricingCardProps) => {
  const { data: session } = useSession();
  const { setPaymentLink } = usePaymentLink();

  console.log(session);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{period.toUpperCase()}</CardTitle>
        <CardDescription>{tier.toUpperCase()}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-1">
          <h2 className="font-bold text-4xl">${price}</h2>
          <p className="text-lg text-muted-foreground">
            {period === "monthly"
              ? "/month"
              : period === "yearly"
              ? "/year"
              : ""}
          </p>
        </div>
        {/* <Button
          className="w-full my-7 font-semibold"
          onClick={() => handlePayment(paymentLink)}
        >
          Get Started
        </Button> */}
        <Link
          href={session ? paymentLink : "/login"}
          className={`${buttonVariants()} w-full my-7 font-semibold`}
          onClick={() => localStorage.setItem("paymentLink", paymentLink)}
        >
          Get Started
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex flex-1 h-[1px] bg-muted" />
          <p className="text-lg text-muted-foreground">Features</p>
          <div className="flex flex-1 h-[1px] bg-muted" />
        </div>
        <div className="flex flex-col gap-3 py-7">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <Check size={16} />
              <p className="text-muted-foreground">{feature}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const PricingCards = () => {
  const pricingTypes: PricingCardProps[] = [
    {
      tier: "Free",
      price: 0,
      period: "forever",
      paymentLink: "#",
      features: [],
    },
    {
      tier: "Premium",
      price: 10,
      period: "monthly",
      paymentLink: "https://buy.stripe.com/test_eVacPY67Q1hHgwM7st",
      features: [
        "Everything in free tier",
        "Institution letter head",
        "Export as PDF",
      ],
    },
    {
      tier: "Premium",
      price: 110,
      period: "yearly",
      paymentLink:
        "https://buy.stripe.com/test_dR64jsgMugcBcgwcMM?prefilled_email=sourovbasu07@gmail.com",
      features: [
        "Everything in free tier",
        "Institution letter head",
        "Export as PDF",
      ],
    },
  ];
  return (
    <div className="w-[900px] flex justify-between gap-7 mx-auto">
      {pricingTypes.map((type, index) => (
        <PricingCard key={index} {...type} />
      ))}
    </div>
  );
};
export default PricingCards;
