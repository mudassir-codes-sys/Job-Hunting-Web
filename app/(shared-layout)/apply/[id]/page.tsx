import ApplyJob from "@/components/others/ApplyJob";
// Metadata for Apply Job page
export const metadata = {
  title: "Apply for Job - Submit Your Application",
  description:
    "Apply for your desired job quickly and easily. Upload your resume, fill details, and get noticed by employers.",
  keywords: [
    "apply job",
    "job application",
    "career",
    "resume",
    "submit application",
  ],
  openGraph: {
    title: "Apply for Job - Submit Your Application",
    description:
      "Apply for your desired job quickly and easily. Upload your resume, fill details, and get noticed by employers.",
    siteName: "YourSiteName",
    type: "website",
  },
};
const Page = () => {
  return (
    <div className="bg-[#22363D] min-h-139 max-h-auto mt-20 ">
      <ApplyJob />
    </div>
  );
};

export default Page;
