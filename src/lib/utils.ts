import { toast } from "@/components/ui/toast";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";
import type { NextApiResponse } from "next";
import { NotificationType } from "@prisma/client";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const catchErrors = (error: unknown, res?: NextApiResponse) => {
  if (error instanceof ZodError) {
    const errors = error.issues.map((issue) => {
      return issue.message;
    });

    toast({
      message: errors.join("\n"),
      type: "error",
      title: "Error",
    });

    if (res) {
      res.status(400).json({ errors });
    }
  } else if (error instanceof Error) {
    toast({ message: error.message, type: "error", title: "Error" });

    if (res) {
      res.status(400).json({ errors: [error?.message] });
    }
  } else {
    toast({
      message: "Something went wrong, please try again later.",
      type: "error",
      title: "Error",
    });

    if (res) {
      res
        .status(500)
        .json({ errors: ["Something went wrong, please try again later."] });
    }
  }
};

export const getNotificationTitle = (type: NotificationType, name?: string) => {
  return name
    ? notificationTitles[type].replace(" ", ` ${name} `)
    : notificationTitles[type];
};

const notificationTitles: Record<NotificationType, string> = {
  [NotificationType.ISSUE_CREATED]: "Issue Created",
  [NotificationType.ISSUE_UPDATED]: "Issue Updated",
  [NotificationType.ISSUE_DELETED]: "Issue Deleted",
  [NotificationType.ISSUE_ASSIGNED]: "Issue Assigned",
  [NotificationType.COMMENT_CREATED]: "Comment Created",
  [NotificationType.COMMENT_UPDATED]: "Comment Updated",
  [NotificationType.COMMENT_DELETED]: "Comment Deleted",
  [NotificationType.PROJECT_MEMBER_ADDED]: "Project Member Added",
  [NotificationType.PROJECT_MEMBER_REMOVED]: "Project Member Removed",
  [NotificationType.PROJECT_MANAGER_ASSIGNED]: "Project Manager Assigned",
  [NotificationType.PROJECT_MANAGER_REMOVED]: "Project Manager Removed",
  [NotificationType.PROJECT_ASSIGNED]: "Project Assigned",
  [NotificationType.PROJECT_CREATED]: "Project Created",
  [NotificationType.PROJECT_UPDATED]: "Project Updated",
  [NotificationType.PROJECT_DELETED]: "Project Deleted",
};
