import { Header } from "./Header";
import { SideBarStudent } from "./SideBarStudent";

interface StudentLayoutProps {
  children: React.ReactNode;
}

export function StudentLayout({ children }: StudentLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <SideBarStudent />
      <div className="pl-60 transition-all duration-300">
        <Header avatarUrl="" />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
