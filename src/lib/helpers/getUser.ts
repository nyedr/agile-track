import { prisma } from "@/lib/prismadb";

interface GetUserOptions {
  username?: string;
  isMulti?: boolean;
  orderBy?: "username" | "createdAt" | "updatedAt" | "roles";
  orderDirection?: "asc" | "desc";
}

const getUser = async ({
  isMulti,
  orderBy,
  orderDirection,
  username,
}: GetUserOptions) => {
  const users = await prisma.user.findMany({
    where: {
      username: username ? username : undefined,
    },
    orderBy: {
      [orderBy ?? "username"]: orderDirection ?? "asc",
    },
  });

  return isMulti ? users : users[0];
};

export default getUser;
