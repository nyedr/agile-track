import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prismadb";
import { Company, companySchema } from "@/lib/validations/company";
import { z } from "zod";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    companySchema.parse(req.body);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }

    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }

  const { name, address, phone, email, website, description, isPublic } =
    req.body as Company;

  const isNameOrEmailDuplicate = await prisma.company.findFirst({
    where: {
      OR: [{ name }, { email }],
    },
  });

  if (isNameOrEmailDuplicate) {
    return res
      .status(409)
      .json({ error: "A company with that name or email already exists" });
  }

  const company = await prisma.company.create({
    data: {
      name,
      address,
      phone,
      email,
      website,
      description,
      isPublic,
    },
  });

  return res.status(201).json({ company });
}
