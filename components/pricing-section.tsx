"use client";
import * as React from "react";
import { CircleCheck } from "lucide-react";

// shadcn/ui bits
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ---- minimal craft-ds inline (single-file helper) ----------------
import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};
type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

const Section = ({ children, className, id }: SectionProps) => (
  <section className={cn("py-8 md:py-12", className)} id={id}>
    {children}
  </section>
);

const Container = ({ children, className, id }: ContainerProps) => (
  <div className={cn("mx-auto max-w-5xl p-6 sm:p-8", className)} id={id}>
    {children}
  </div>
);
// ------------------------------------------------------------------

type PlanTier = "Monthly" | "Yearly";

interface PricingCardProps {
  title: PlanTier;
  price: string;
  description?: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
}

// Dummy pricing data
const pricingData: PricingCardProps[] = [
  {
    title: "Monthly",
    price: "$29/month",
    description: "Perfect for small businesses and individuals.",
    features: [
      "Post Unlimited Jobs",
      "Higher Visibility",
      "Premium Badge On Your Post",
    ],
    cta: "Choose Plan",
    href: "https://stripe.com/",
  },
  {
    title: "Yearly",
    price: "$22/month",
    description: "Best for growing businesses with more needs.",
    features: [
      "Post Unlimited Jobs",
      "Higher Visibility",
      "Premium Badge On Your Post",
    ],
    cta: "Choose Plan",
    href: "https://stripe.com/",
    featured: true,
  },
];

export default function Pricing() {
  const handleClick = async (price: number, plan: string) => {
    try {
      const res = await fetch("/api/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: Number(price), plan }),
      });
      const data = await res.json();
      console.log(data);
      window.location.href = data.url;
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  return (
    <Section>
      <Container className="flex flex-col max-w-3xl mx-auto gap-4 text-center">
        <h2 className=" text-white font-semibold text-3xl  mt-3">Pricing</h2>
        <p className="text-lg  md:text-xl text-gray-300">
          Select the plan that best suits your needs.
        </p>

        <div className="not-prose mt-4 flex justify-between gap-6 ">
          {pricingData.map((plan) => (
            <PricingCard key={plan.title} plan={plan} onClick={handleClick} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function PricingCard({
  plan,
  onClick,
}: {
  plan: PricingCardProps;
  onClick: (price: number, plan: string) => void;
}) {
  return (
    <div
      className={cn(
        "flex flex-col  bg-[#edf1fe] backdrop-blur-2xl text-black  rounded-lg border p-6 text-left",
        plan.featured && "border-primary shadow-sm ring-1 ring-primary/10"
      )}
      aria-label={`${plan.title} plan`}
    >
      <div className="text-center ">
        <div className="inline-flex  items-center gap-2">
          <Badge variant="default">{plan.title}</Badge>
          {plan.featured && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              Most popular
            </span>
          )}
        </div>
        <h3 className="mb-2 mt-4 text-2xl font-semibold text-primary">
          {plan.price}
        </h3>
        {plan.description && (
          <p className="text-sm opacity-70">{plan.description}</p>
        )}
      </div>

      <div className="my-4 border-t" />

      <ul className="space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center text-sm opacity-80">
            <CircleCheck className="mr-2 h-4 w-4" aria-hidden />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <Button
          onClick={() =>
            onClick(Number(plan.price.replace(/[^0-9]/g, "")), plan.title)
          }
          size="sm"
          className="w-full cursor-pointer"
          variant="default"
        >
          {plan.cta}
        </Button>
      </div>
    </div>
  );
}
