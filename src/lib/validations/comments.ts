import { z } from "zod";

export const commentSchema = z.object({
  id: z.string().uuid({ message: "Invalid comment" }),
  content: z.string().nonempty({ message: "Comment content is required" }),
  userId: z.string().uuid({ message: "Invalid user" }),
  issueId: z.string().uuid({ message: "Invalid issue" }),
});

export type CommentInput = z.infer<typeof commentSchema>;
