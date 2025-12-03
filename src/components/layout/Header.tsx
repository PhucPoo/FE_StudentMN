import { Button } from "@/components/ui/button";

interface HeaderProps {
  currentClass: string;
}

export function Header({ currentClass }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-end gap-4 border-b border-border bg-card px-6">
      <span className="text-sm font-medium text-foreground">{currentClass}</span>
      <Button size="sm">Chọn lớp</Button>
    </header>
  );
}
