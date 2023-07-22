import { FC } from "react";
import Image from "next/image";
import Icons from "./Icons";
import Link from "next/link";
import Button, { buttonVariants } from "@/ui/Button";
import ThemeToggle from "@/components/ThemeToggle";

const Header: FC = () => {
  return (
    <header className="bg-gray-50 dark:bg-gray-800 fixed top-0 left-0 right-0">
      <div className="mx-auto max-w-screen-xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-center 1hc:justify-between gap-4">
          <Button variant="header" size="header">
            <span className="sr-only">Sidebar menu trigger</span>
            <Icons.Menu className="w-5 h-5" />
          </Button>

          <div className="relative hidden 1hc:block">
            <label className="sr-only" htmlFor="search">
              {" "}
              Search{" "}
            </label>

            <input
              className="h-10 w-full rounded-lg border-none bg-white pe-10 ps-4 text-sm shadow-sm outline-none dark:bg-slate-600 dark:text-slate-50 dark:placeholder:text-slate-300 1hc:w-56"
              id="search"
              type="text"
              placeholder="Search website..."
            />

            <button
              type="button"
              className="absolute end-1 top-1/2 -translate-y-1/2 rounded-md bg-gray-50 p-2 text-gray-600 transition dark:bg-slate-700 dark:text-slate-50"
            >
              <span className="sr-only">Search</span>
              <Icons.Search className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-1 items-center justify-between gap-8 1hc:justify-end">
            <div className="flex gap-4">
              <Button
                type="button"
                variant="header"
                size="header"
                className="1hc:hidden"
              >
                <span className="sr-only">Search Modal Trigger</span>
                <Icons.Search className="w-5 h-5" />
              </Button>

              <Link
                href="/projects/new"
                className={buttonVariants({
                  variant: "header",
                  size: "header",
                })}
              >
                <span className="sr-only">New Project</span>
                <Icons.FolderAdd className="w-5 h-5" />
              </Link>

              <ThemeToggle />
            </div>

            <button
              type="button"
              className="group flex shrink-0 items-center rounded-lg transition"
            >
              <span className="sr-only">Menu</span>
              <Image
                alt="User image"
                src={"https://i.postimg.cc/j5CS5hLY/example-User-Image.webp"}
                className="rounded-full object-cover"
                width={40}
                height={40}
              />

              <p className="ms-2 hidden text-left text-xs sm:block">
                <strong className="block font-medium dark:text-slate-100">
                  Eric Frusciante
                </strong>

                <span className="text-gray-500 dark:text-gray-400">
                  {" "}
                  eric@frusciante.com{" "}
                </span>
              </p>

              <Icons.ChevronDown className="ms-4 hidden h-5 w-5 text-gray-500 transition group-hover:text-gray-700 sm:block" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
