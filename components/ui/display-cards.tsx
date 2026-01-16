"use client";

import { cn } from "@/lib/utils";
import { Sparkles, Rocket, Users } from "lucide-react";
import { motion } from "framer-motion";
interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-cyan-700" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-cyan-700",
  titleClassName = "text-cyan-700",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-32 sm:h-36 md:h-40 z-1 w-52 sm:w-56 md:w-64 -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 bg-muted/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] hover:border-white/20 hover:bg-muted *:flex *:items-center *:gap-2",
        className
      )}
    >
      <div>
        <span
          className={cn(
            "relative inline-block rounded-full p-1",
            iconClassName
          )}
        >
          {icon}
        </span>
        <p className={cn("text-lg sm:text-xl font-medium", titleClassName)}>
          {title}
        </p>
      </div>
      <p className="whitespace-normal text-black text-sm sm:text-base md:text-base">
        {description}
      </p>
      <p className="text-muted-foreground text-xs sm:text-sm">{date}</p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards: DisplayCardProps[] = [
    {
      icon: <Sparkles size={24} />,
      title: "New Candidate",
      description: "Interested in frontend role.",
      date: "10:15 AM",
      className:
        "[grid-area:stack] hover:-translate-y-10 sm:hover:-translate-y-12 md:hover:-translate-y-14 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Rocket size={24} />,
      title: "Recruiter",
      description: "Frontend skills required.",
      date: "10:17 AM",
      className:
        "[grid-area:stack] translate-x-0 sm:translate-x-4 md:translate-x-8 translate-y-10 sm:translate-y-12 md:translate-y-14 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Users size={24} />,
      title: "New Candidate",
      description: "When is the interview?",
      date: "10:20 AM",
      className:
        "[grid-area:stack] translate-x-0 sm:translate-x-8 md:translate-x-16 translate-y-20 sm:translate-y-24 md:translate-y-28 hover:translate-y-10",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <motion.div
      initial={{ y: 20, opacity: 40 }}
      whileInView={{ y: 0, opacity: 100 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
        delay: 0.1,
      }}
      className="grid [grid-template-areas:'stack'] place-items-center px-4 sm:px-10 md:px-20 gap-4 opacity-100 animate-in fade-in-0 duration-700"
    >
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </motion.div>
  );
}
