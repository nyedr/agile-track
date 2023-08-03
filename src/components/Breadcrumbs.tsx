import { useRouter } from "next/router";
import Image from "next/image";
import Home from "@/public/Home.svg";

const Crumb = ({ location, href }: { location: string; href: string }) => {
  return (
    <a href={href} className="text-gray-600 hover:underline dark:text-gray-200">
      {location}
    </a>
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
        <a href="#" className="text-gray-600 dark:text-gray-200">
          <Image src={Home} alt="Home" className="h-5 w-5" />
        </a>
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
