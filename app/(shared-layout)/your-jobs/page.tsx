import YourJobs from "@/components/others/YourJobs";
export const metadata = {
  title: "Your Posted Jobs - Manage Your Listings",
  description:
    "View and manage all the jobs you've posted. Track applications and update job listings easily.",
  keywords: [
    "your jobs",
    "manage jobs",
    "job listings",
    "applications",
    "posted jobs",
  ],
  openGraph: {
    title: "Your Posted Jobs - Manage Your Listings",
    description:
      "View and manage all the jobs you've posted. Track applications and update job listings easily.",

    type: "website",
  },
};
const Page = () => {
  return (
    <div className="mt-20 bg-[#22363D] min-h-139 max-h-auto w-full">
      <YourJobs />
    </div>
  );
};

export default Page;
