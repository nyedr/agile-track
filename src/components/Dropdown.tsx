"use client";
import { useState, ReactNode, useEffect } from "react";
import type { IconType } from "react-icons";

interface DropdownItemProps {
  Icon: IconType;
  title: string;
  description: string;
}

export const DropdownItem = ({
  Icon,
  title,
  description,
}: DropdownItemProps) => (
  <a
    href="#"
    className="-m-3 inline-flex items-start rounded-xl p-3 transition duration-150 ease-in-out hover:bg-gray-50 dark:hover:bg-gray-600"
  >
    <Icon className="md hydrated h-6 w-6 text-blue-500" />
    <div className="ml-4">
      <p className="text-sm font-medium text-black">{title}</p>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
    </div>
  </a>
);

interface DropdownProps {
  label: string;
  children: ReactNode;
}

export const Dropdown = ({ label, children }: DropdownProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="focus:shadow-outline z-50 flex w-full flex-row items-center px-2 py-2 text-left text-sm text-gray-700 duration-300 hover:text-blue-500 focus:outline-none dark:text-gray-200 md:mt-0 md:inline md:w-auto"
      >
        <span>{label}</span>
        <svg
          fill="currentColor"
          viewBox="0 0 20 20"
          className={`ml-1 mt-1 inline h-4 w-4 ${
            open ? "rotate-180" : "rotate-0"
          } transform transition-transform duration-200 md:-mt-1`}
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <div
        className={`-trangray-x-1/2 absolute -left-full z-10 mt-3 w-screen max-w-xs transform px-2 sm:px-0 ${
          open ? "" : "hidden"
        }`}
      >
        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
