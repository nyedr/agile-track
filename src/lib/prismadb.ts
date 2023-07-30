import { PrismaProvider } from "@prisma/client";

const client = globalThis.prisma || new PrismaProvider();
if (process.env.NODE_ENV === "production") globalThis.prisma = client;

export default client;
