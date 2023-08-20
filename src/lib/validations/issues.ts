import { z } from "zod";
import { Priority, Statuses, IssueType } from "@prisma/client";

export const issueSchema = z.object({
  title: z
    .string()
    .nonempty()
    .min(8, { message: "Title must be at least 8 characters" })
    .max(50, { message: "Title must be less than 50 characters" }),
  description: z
    .string()
    .nonempty()
    .min(8, { message: "Description must be at least 8 characters" })
    .max(500, { message: "Description must be less than 500 characters" }),
  status: z.enum([
    Statuses.OPEN,
    Statuses.IN_PROGRESS,
    Statuses.COMPLETED,
    Statuses.CLOSED,
  ]),
  priority: z.enum([
    Priority.LOW,
    Priority.MEDIUM,
    Priority.HIGH,
    Priority.URGENT,
  ]),
  type: z.enum([
    IssueType.BUG,
    IssueType.FEATURE,
    IssueType.TASK,
    IssueType.EPIC,
    IssueType.STORY,
  ]),
  projectId: z.string().uuid({ message: "Invalid project" }),
  userId: z.string().uuid({ message: "Invalid user" }),
  assigneeId: z.string().uuid({ message: "Invalid assignee" }),
  reporterId: z.string().uuid({ message: "Invalid reporter" }),
  comments: z.array(
    z.object({
      content: z.string().nonempty({ message: "Comment content is required" }),
      userId: z.string().uuid({ message: "Invalid user" }),
    })
  ),
});

export type IssueInput = z.infer<typeof issueSchema>;
