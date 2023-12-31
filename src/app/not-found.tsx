import LinkButton from "@/components/ui/LinkButton";
import Clumsy from "@/public/Clumsy";
import { FC } from "react";

const NotFound: FC = ({}) => {
  return (
    <div className="grid min-h-screen px-4 place-content-center bg-background">
      <div className="flex flex-col items-center gap-2 text-center">
        <Clumsy />
        <h3 className="mt-2 text-2xl font-semibold text-primary-color-accent">
          Uh-oh! 404 Error
        </h3>
        <p className="text-3xl font-semibold text-primary-text dark:text-primary-color sm:text-4xl">
          Page not found
        </p>
        <p className="max-w-prose text-secondary-text dark:text-primary-color-accent">
          Sorry, the page you are looking for could not be found or has been
          removed.
        </p>
        <LinkButton
          href=".."
          variant="color"
          className="flex items-center gap-1 whitespace-nowrap"
        >
          Go back
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
              clipRule="evenodd"
            />
          </svg>
        </LinkButton>
      </div>
    </div>
  );
};

export default NotFound;
