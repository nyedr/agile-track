import { Notification } from "@prisma/client";
import LinkButton from "./ui/LinkButton";
import Icons from "@/components/Icons";
import { getNotificationTitle } from "@/lib/utils";

const AppNotification = ({ content, link, targetId, type }: Notification) => {
  return (
    <div
      role="alert"
      className="rounded-xl border border-gray-100 bg-white p-4 shadow-xl dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="flex items-start gap-4">
        <span className="text-green-600"></span>

        <div className="flex-1">
          <strong className="block font-medium text-gray-900 dark:text-white">
            {getNotificationTitle(type)}
          </strong>

          <p className="mt-1 text-sm text-gray-700 dark:text-gray-200 dark:hover:bg-gray-800">
            {content}
          </p>

          <div className="mt-4 flex gap-2">
            <LinkButton
              href={link}
              className="inline-flex items-center gap-2 rounded-lg bg-primary-color px-4 py-2 text-white hover:bg-primary-color-accent"
            >
              <span className="text-sm"> View </span>

              <Icons.ExternalLink className="h-4 w-4" />
            </LinkButton>
          </div>
        </div>

        <button className="text-gray-500 transition hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-500">
          <span className="sr-only">Delete notification</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AppNotification;
