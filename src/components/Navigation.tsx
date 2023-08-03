import type { ReactNode } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Breadcrumbs from "@/components/Breadcrumbs";

interface NavigationProps {
  children: ReactNode;
  projectName: string;
}

const Navigation = ({ children, projectName }: NavigationProps) => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex h-full overflow-hidden bg-white">
        <Sidebar projectName={projectName} />
        <div className="flex w-0 flex-1 flex-col overflow-hidden">
          <main className="relative flex-1 overflow-y-auto focus:outline-none">
            <Breadcrumbs />
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
