"use client";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/DropdownMenu";
import Link from "next/link";
import Icons from "@/components/Icons";
import LinkButton from "@/ui/LinkButton";
import Button from "@/ui/Button";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Issue, Project } from "@prisma/client";
import { Location, PathVariants } from "@/types/breadcrumbs";

import { getUserProjectsById } from "@/lib/helpers/getProject";
import getIssuesAssignedToUser from "@/lib/helpers/getUserIssues";

interface CrumbProps {
  path: string;
  href: string;
  isDropdown?: boolean;
  dropdownLinks: Location[] | null;
}

const Crumb = ({ path, href, isDropdown, dropdownLinks }: CrumbProps) => {
  return isDropdown && dropdownLinks?.length ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="select">{path}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {dropdownLinks.map((item) => (
          <DropdownMenuItem key={item.name}>
            <LinkButton href={item.href}>{item.name}</LinkButton>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <LinkButton variant="none" href={href} className="text-secondary-text">
      {path}
    </LinkButton>
  );
};

const isCrumbVaried = (crumb: string) => {
  return crumb === "projects" || crumb === "issues";
};

const Separator = () => <span className="text-secondary-text"> / </span>;

const Breadcrumbs = ({ userId }: { userId?: string }) => {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);
  const projectName = pathParts[0] === "projects" ? pathParts[1] : null;
  const [pathVariants, setPathVariants] = useState<PathVariants>({
    projects: null,
    issues: null,
  });

  const crumbs = pathParts.map((part, index) => ({
    path: part,
    href: `/${pathParts.slice(0, index + 1).join("/")}`,
  }));

  useEffect(() => {
    const fetchProjectPathVariants = async () => {
      if (!userId) return;
      const userProjects = await getUserProjectsById(userId);
      const projectLocations: Location[] = userProjects.map(
        (project: Project) => ({
          name: project.name,
          href: `/projects/${project.name}`,
        })
      );

      setPathVariants((prev) => ({ ...prev, projects: projectLocations }));
    };

    const fetchIssuePathVariants = async (projectName: string | null) => {
      if (!userId || !projectName) return;
      const userIssues = await getIssuesAssignedToUser(userId);
      const issueLocations: Location[] = userIssues.map((issue: Issue) => ({
        name: issue.title,
        href: `projects/${projectName}/issues/${issue.title}`,
      }));
      setPathVariants((prev) => ({ ...prev, issues: issueLocations }));
    };

    if (pathname.includes("projects") && userId) fetchProjectPathVariants();
    if (pathname.includes("issues") && userId)
      fetchIssuePathVariants(projectName);
  }, [pathname, userId, projectName]);

  return (
    <div className="p-4 mx-auto sm:px-6 md:px-8 2xl:max-w-7xl">
      <div className="flex items-center gap-5 p-4 overflow-x-auto whitespace-nowrap">
        <Link href="/">
          <Icons.Home className="w-5 h-5" />
        </Link>
        <Separator />
        {crumbs.map((crumb, idx) => {
          return (
            <>
              <Crumb
                isDropdown={isCrumbVaried(crumb.path)}
                dropdownLinks={
                  isCrumbVaried(crumb.path)
                    ? pathVariants[crumb.path as "issues" | "projects"]
                    : null
                }
                key={idx}
                {...crumb}
              />
              {idx !== crumbs.length - 1 && <Separator />}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumbs;
