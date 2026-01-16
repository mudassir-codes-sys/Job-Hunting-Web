"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/app/slices/userSlice";
import { RootState } from "@/app/store/store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Example() {
  const dispatch = useDispatch();
  const userEmail = useSelector((state: RootState) => state.user.userEmail);
  const router = useRouter();
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
    <Menu as="div" className="relative inline-block  sm:hidden ">
      <MenuButton className="inline-flex items-center justify-center">
        <RxHamburgerMenu size={25} color="#4FC3F7" />
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-black outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <Link
              href="/"
              className="block px-4 py-2 text-sm text-white data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
            >
              Home
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href="/jobs"
              className="block px-4 py-2 text-sm text-white data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
            >
              Jobs
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href="/your-jobs"
              className="block px-4 py-2 text-sm text-white data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
            >
              Your Jobs
            </Link>
          </MenuItem>
          <MenuItem>
            {userEmail ? (
              <button
                onClick={handleLogout}
                type="button"
                className="block w-full px-4 py-2 text-left text-sm text-white"
              >
                Logout
              </button>
            ) : (
              <Link href="/login">
                <button
                  type="button"
                  className="block w-full px-4 py-2 text-left text-sm text-white"
                >
                  Login
                </button>
              </Link>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
