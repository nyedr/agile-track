import { User } from "@prisma/client";

export interface DecodedData {
  email: string;
  roles: string[];
}

export enum SignInProviders {
  GOOGLE = "google",
  GITHUB = "github",
  CREDENTIALS = "credentials",
}

export type UserWithoutPassword = Omit<User, "password">;
