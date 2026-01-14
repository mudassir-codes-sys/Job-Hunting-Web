import Link from "next/link";
import { Button } from "../ui/button";

function Navbar() {
  return (
    <>
      <nav className="text-white sm:flex gap-4 hidden items-center justify-center ">
        <Link href="/">Home</Link>
        <Link href="/jobs">Jobs</Link>
        <Link href="/post-job">Post Job</Link>
        <Link href="/">HOME</Link>
      </nav>

      <div className="hidden sm:flex items-center gap-4 ">
        <Button className="bg-[#4FC3F7] hover:bg-[#82DFFF] cursor-pointer px-5 ">
          Login
        </Button>
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
