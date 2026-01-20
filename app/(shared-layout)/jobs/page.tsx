import JobsComp from "@/components/others/JobsComp";

export const metadata = {
  title: "Jobs - Find Premium Jobs",
  description: "Explore premium jobs handpicked for you. Apply online easily.",
  keywords: ["jobs", "premium jobs", "career", "apply online"],

  openGraph: {
    title: "Jobs - Find Jobs",
    description:
      "Explore premium jobs handpicked for you. Apply online easily.",

    type: "website",
  },
};

const Page = () => {
  return <JobsComp />;
};

export default Page;
