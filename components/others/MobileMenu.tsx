import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";

export default function Example() {
  return (
    <Menu as="div" className="relative inline-block  sm:hidden ">
      <MenuButton className="inline-flex items-center justify-center">
        <RxHamburgerMenu size={25} color="#4FC3F7" />
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-[#142b33b3]/70 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <Link
              href="#"
              className="block px-4 py-2 text-sm text-white data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
            >
              Home
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href="#"
              className="block px-4 py-2 text-sm text-white data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
            >
              Support
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href="/post-job"
              className="block px-4 py-2 text-sm text-white data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
            >
              Post Job
            </Link>
          </MenuItem>
          <form action="#" method="POST">
            <MenuItem>
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm text-white data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
              >
                Sign out
              </button>
            </MenuItem>
          </form>
        </div>
      </MenuItems>
    </Menu>
  );
}
