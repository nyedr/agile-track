"use client";

import { useEffect, type ReactNode, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/helpers/getUser";
import { UserWithoutPassword } from "@/types/auth";

interface NavigationProps {
  children: ReactNode;
  projectName: string;
}

const Navigation = ({ children, projectName }: NavigationProps) => {
  const { data: session, status } = useSession();
  // if (status !== "authenticated") redirect("/login");
  const [user, setUser] = useState<UserWithoutPassword | null>(null);

  useEffect(() => {
    const getUser = async () => {};

    getUser();
  }, [session?.user?.email]);

  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <div className="flex h-full overflow-hidden bg-background">
        <Sidebar projectName={projectName} />
        <div className="flex flex-col flex-1 w-0 overflow-hidden">
          <main className="container relative flex-1 overflow-y-auto focus:outline-none">
            <Breadcrumbs userId={user?.id} />
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
