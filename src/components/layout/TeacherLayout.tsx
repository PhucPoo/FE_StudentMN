import { Header } from "./Header";
import { SideBarTeacher } from "./SideBarTeacher";

interface TeacherLayoutProps {
  children: React.ReactNode;
}

export function TeacherLayout({ children }: TeacherLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <SideBarTeacher />
      <div className="pl-60 transition-all duration-300">
        <Header avatarUrl="" />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
