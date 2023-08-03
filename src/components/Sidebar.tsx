import LinkButton from "@/ui/LinkButton";
import type { IconType } from "react-icons";

interface SidebarItemProps = {
  href: string,
  text: string,
  alt: string,
  Icon: IconType,
  notifications?: {
    amount: number,
    color?: string
  }
};

const SidebarItem = ({ href, text, alt, Icon, notification }: SidebarItemProps) => {
    return (
        <LinkButton variant="sidebarItem" href={href}>
            <Icon alt={alt} className="h-4 w-4" />
            <span className="ml-4"> {text} </span>
            {notifications && (<span className={`ml-auto inline-flex items-center rounded-full bg-${notifications.color ?? "blue"}-50 px-2.5 py-0.5 text-xs font-medium text-${notifications.color ?? "blue"}-500`}>{notifications.amount}</span>)}
        </LinkButton>
    )
}

const Sidebar = ({ projectName }: { projectName: string }) => {
  const sidebarSectionTitle = "px-4 pt-4 text-xs font-semibold uppercase text-gray-400 dark:text-gray-100"

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex w-64 flex-col">
        <div className="flex flex-grow flex-col overflow-y-auto border-r bg-gray-50 pt-5 dark:bg-gray-700">
          <div className="flex flex-shrink-0 flex-col ps-7">
            <a className="text-xl font-semibold tracking-tighter text-gray-900 focus:outline-none focus:ring dark:text-gray-50" href="/">
              <span className="inline-flex items-center gap-3">
                <img src="projectIcon.svg" alt="Project" className="mx-auto h-5 w-5" />
                {name || "Project Name"}
              </span>
            </a>
            <button className="focus:shadow-outline hidden rounded-lg focus:outline-none">
              <img src="buttonIcon.svg" alt="Button" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-5 flex flex-grow flex-col px-4">
            <nav className="flex-1 space-y-1 bg-gray-50 dark:bg-gray-700">
              <p className="sidebarSectionTitle">Planning</p>
              <ul>
                <li>
                  <SidebarItem Icon={Timeline} alt="Timeline" text="Timeline" href={`${projectName}/timeline`} />
                </li>
                <li>
                  <SidebarItem Icon={Board} alt="Board" text="Board" href={`${projectName}/board`} />
                </li>
              </ul>
              <p className="sidebarSectionTitle">Project</p>
                <ul>
                 <li>
                  <SidebarItem Icon={Timeline} alt="Details" text="Details" href={`${projectName}/details`} />
                 </li>
                 <li>
                  <SidebarItem notifications={{ number: 25 }} Icon={Notifications} alt="Notifications" text="Notifications" href={`${projectName}/notifications`} />
                 </li>
                 <li>
                   <SidebarItem Icon={Resources} alt="Resources" text="Resources" href={`${projectName}/resources`} />
                 </li>
               </ul>

              <p className="sidebarSectionTitle">Customization</p>
              <ul>
                <li>
                  <SidebarItem Icon={Settings} alt="Settings" text="Settings" href={`${projectName}/settings`} />
                </li>
                <li>
                  <SidebarItem Icon={Links} alt="Links" text="Links" href={`${projectName}/links`} />
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