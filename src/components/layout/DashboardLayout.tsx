import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar className="fixed left-0 top-0 z-40" />
      <main className="flex-1 ml-64 overflow-auto">{children}</main>
    </div>
  );
}
