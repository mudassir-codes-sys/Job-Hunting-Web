import Applicants from "@/components/others/Applicants";

export const metadata = {
  title: "Job Applicants - View Applications",
  description:
    "Check all applicants for your posted jobs. Review resumes, contact candidates, and manage hiring efficiently.",
  keywords: [
    "job applicants",
    "candidates",
    "applications",
    "hiring",
    "resumes",
  ],

  viewport: "width=device-width, initial-scale=1.0",
  openGraph: {
    title: "Job Applicants - View Applications",
    description:
      "Check all applicants for your posted jobs. Review resumes, contact candidates, and manage hiring efficiently.",
    type: "website",
  },
};

const Page = () => {
  return (
    <div className="bg-[#22363D] mt-20 w-full min-h-screen max-h-auto">
      <Applicants />
    </div>
  );
};

export default Page;
