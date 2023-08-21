import { prisma } from "@/lib/prismadb";

async function getIssuesAssignedToUser(userId: string) {
  const issuesFetchResponse = await fetch(`/api/users/${userId}/issues`);
  const issues = await issuesFetchResponse.json();

  return issues;
}

export default getIssuesAssignedToUser;
