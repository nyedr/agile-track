import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import { prisma } from "@/lib/prismadb";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { role, username, companyId, id } = req.query;
}
