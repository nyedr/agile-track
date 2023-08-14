"use client";

import { useState } from "react";
import Icons from "@/components/Icons";
import { Dropdown, DropdownItem } from "@/components/Dropdown";
import LinkButton from "./ui/LinkButton";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="mx-auto w-full shadow-md 2xl:max-w-7xl">
      <div className="relative z-10 mx-auto flex w-full flex-col p-5 opacity-95 shadow-sm shadow-gray-300 dark:bg-gray-800 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
        <div className="flex flex-row items-center justify-between lg:justify-start">
          <a
            className="text-3xl tracking-tight text-black focus:outline-none focus:ring dark:text-gray-50"
            href="/"
          >
            <span className="font-medium focus:ring-0">AgileTrack</span>
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-black focus:text-black focus:outline-none md:hidden"
          >
            {menuOpen ? (
              <Icons.Close className="h-6 w-6" />
            ) : (
              <Icons.Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        <nav
          className={
            menuOpen
              ? "mt-2 flex flex-col items-start gap-2"
              : "hidden flex-grow flex-col items-center md:flex md:flex-row md:justify-end md:pb-0"
          }
        >
          <LinkButton
            className="px-2 py-2 text-sm text-gray-700 duration-300 hover:text-blue-500 dark:text-gray-200 md:px-3 lg:px-6"
            href="#"
            variant="color"
            size="sm"
          >
            Your work
          </LinkButton>
          <LinkButton
            className="px-2 py-2 text-sm text-gray-700 duration-300 hover:text-blue-500 dark:text-gray-200 md:px-3 lg:px-6"
            href="#"
            variant="color"
            size="sm"
          >
            Projects
          </LinkButton>
          <Dropdown label="Dropdown List">
            <DropdownItem
              Icon={Icons.Search}
              title="View all projects"
              description="Here is all your hard worl"
            />
            <DropdownItem
              Icon={Icons.BookOutline}
              title="Blog"
              description="Interviews, tutorials and more"
            />
            <DropdownItem
              Icon={Icons.CreateOutline}
              title="Create Project"
              description="Stretch your imagination and amaze"
            />
            <DropdownItem
              Icon={Icons.MeterOutline}
              title="Projects Dashboard"
              description="Track your own progress easily"
            />
          </Dropdown>
        </nav>
      </div>
    </div>
  );
};

export default Header;
