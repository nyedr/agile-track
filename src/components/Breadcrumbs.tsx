"use client";

import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

const Crumb = ({ location, href }: { location: string; href: string }) => {
  return (
    <link
      href={href}
      className="text-gray-600 hover:underline dark:text-gray-200"
    >
      {location}
    </link>
  );
};

const Separator = () => (
  <span className="mx-5 text-gray-500 dark:text-gray-300"> / </span>
);

const Breadcrumbs = () => {
  const router = useRouter();
  const { pathname } = router;
  const pathParts = pathname.split("/").filter(Boolean);

  const crumbs = pathParts.map((part, index) => ({
    location: part,
    href: `/${pathParts.slice(0, index + 1).join("/")}`,
  }));

  return (
    <div className="mx-auto bg-white p-4 dark:bg-gray-800 dark:opacity-95 sm:px-6 md:px-8 2xl:max-w-7xl">
      <div className="flex items-center overflow-x-auto whitespace-nowrap p-4">
        <Link href="/" className="text-gray-600 dark:text-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </Link>
        {crumbs.map((crumb, idx) => {
          return (
            <>
              <Crumb key={idx} {...crumb} />
              {idx !== crumbs.length - 1 && <Separator />}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumbs;
