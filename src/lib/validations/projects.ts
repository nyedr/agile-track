import { z } from "zod";
import { Statuses } from "@prisma/client";

export const newProjectSchema = z.object({
  name: z.string().nonempty({ message: "Project name is required" }),
  description: z
    .string()
    .nonempty({ message: "Project description is required" }),
  status: z
    .enum([
      Statuses.OPEN,
      Statuses.COMPLETED,
      Statuses.CLOSED,
      Statuses.IN_PROGRESS,
    ])
    .default(Statuses.OPEN),
  projectManagerId: z.string().uuid({ message: "Invalid project manager" }),
  startDate: z.date().default(() => new Date()),
  endDate: z.date().nullable(),
});

export type NewProject = z.infer<typeof newProjectSchema>;
