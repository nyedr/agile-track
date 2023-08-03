import LinkButton from "@/ui/LinkButton";
import type { IconType } from "react-icons";
import Image from "next/image";
import Icons from "@/components/Icons";

interface SidebarItemProps {
  href: string;
  text: string;
  Icon: IconType;
  notifications?: {
    amount: number;
    color?: string;
  };
}

const SidebarItem = ({ href, text, Icon, notifications }: SidebarItemProps) => {
  return (
    <LinkButton variant="sidebarItem" href={href}>
      <Icon className="h-4 w-4" />
      <span className="ml-4"> {text} </span>
      {notifications && (
        <span
          className={`ml-auto inline-flex items-center rounded-full bg-${
            notifications.color ?? "blue"
          }-50 px-2.5 py-0.5 text-xs font-medium text-${
            notifications.color ?? "blue"
          }-500`}
        >
          {notifications.amount}
        </span>
      )}
    </LinkButton>
  );
};

const Sidebar = ({ projectName }: { projectName: string }) => {
  const sidebarSectionTitle =
    "px-4 pt-4 text-xs font-semibold uppercase text-gray-400 dark:text-gray-100";

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex w-64 flex-col">
        <div className="flex flex-grow flex-col overflow-y-auto border-r bg-gray-50 pt-5 dark:bg-gray-700">
          <div className="flex flex-shrink-0 flex-col ps-7">
            <a
              className="text-xl font-semibold tracking-tighter text-gray-900 focus:outline-none focus:ring dark:text-gray-50"
              href="/"
            >
              <span className="inline-flex items-center gap-3">
                <Image
                  src="projectIcon.svg"
                  alt="Project"
                  className="mx-auto h-5 w-5"
                />
                {projectName || "Project Name"}
              </span>
            </a>
            <button className="focus:shadow-outline hidden rounded-lg focus:outline-none">
              <Image src="buttonIcon.svg" alt="Button" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-5 flex flex-grow flex-col px-4">
            <nav className="flex-1 space-y-1 bg-gray-50 dark:bg-gray-700">
              <p className="sidebarSectionTitle">Planning</p>
              <ul>
                <li>
                  <SidebarItem
                    Icon={Icons.Calendar}
                    text="Timeline"
                    href={`${projectName}/timeline`}
                  />
                </li>
                <li>
                  <SidebarItem
                    Icon={Icons.Clipboard}
                    text="Board"
                    href={`${projectName}/board`}
                  />
                </li>
              </ul>
              <p className="sidebarSectionTitle">Project</p>
              <ul>
                <li>
                  <SidebarItem
                    Icon={Icons.Data}
                    text="Details"
                    href={`${projectName}/details`}
                  />
                </li>
                <li>
                  <SidebarItem
                    notifications={{ amount: 25 }}
                    Icon={Icons.Bell}
                    text="Notifications"
                    href={`${projectName}/notifications`}
                  />
                </li>
                <li>
                  <SidebarItem
                    Icon={Icons.Boxes}
                    text="Resources"
                    href={`${projectName}/resources`}
                  />
                </li>
              </ul>

              <p className="sidebarSectionTitle">Customization</p>
              <ul>
                <li>
                  <SidebarItem
                    Icon={Icons.Gear}
                    text="Settings"
                    href={`${projectName}/settings`}
                  />
                </li>
                <li>
                  <SidebarItem
                    Icon={Icons.Sign}
                    text="Links"
                    href={`${projectName}/links`}
                  />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
