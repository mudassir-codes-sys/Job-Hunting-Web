import PostJobForm from "@/components/others/PostJobForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post Job",
  description: "Post your job on web to find employees",
};

const Page = () => {
  return (
    <div className="mt-20  w-full h-auto bg-linear-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] ">
      <PostJobForm />
    </div>
  );
};

export default Page;
// bg-white/10 backdrop-blur-md border border-white/20
