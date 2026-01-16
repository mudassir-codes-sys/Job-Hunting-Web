"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { setUser } from "@/app/slices/userSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const userEmail = useSelector((state: RootState) => state.user.userEmail);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        dispatch(setUser({ userEmail: "", isPaid: false }));
        toast.success(data.message);
        router.push("/login");
      } else toast.error("An unexpected error occurred");
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <nav className="text-white sm:flex gap-4 hidden items-center justify-center ">
        <Link href="/">Home</Link>
        <Link href="/jobs">Jobs</Link>
        <Link href="/your-jobs">Your Jobs</Link>
        <Link href="/pricing">Pricing</Link>
      </nav>

      <div className="hidden sm:flex items-center gap-4 ">
        {!userEmail ? (
          <Link href="/login">
            <Button className="bg-[#4FC3F7] hover:bg-[#82DFFF] cursor-pointer px-5 ">
              Login
            </Button>
          </Link>
        ) : (
          <Button
            onClick={handleLogout}
            className="bg-[#4FC3F7] hover:bg-[#82DFFF] cursor-pointer px-5 "
          >
            Logout
          </Button>
        )}
        <svg
          className=""
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="34"
          viewBox="0 0 64 64"
        >
          <circle cx="32" cy="32" r="32" fill="#4FC3F7" />

          <circle cx="32" cy="22" r="10" fill="white" />

          <path
            d="M16 52c0-8.837 7.163-16 16-16s16 7.163 16 16H16z"
            fill="white"
          />
        </svg>
      </div>
    </>
  );
}

export default Navbar;
