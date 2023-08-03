import type { ReactNode } from "react";
import Header from "@/components/Header";

const Navigation = ({ children, project }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex h-full overflow-hidden bg-white">
        <Sidebar projectTitle="" />
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