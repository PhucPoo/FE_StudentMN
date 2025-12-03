import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ActionCardProps {
  icon: LucideIcon;
  title: string;
  iconColor?: "info" | "success" | "warning" | "danger" | "purple" | "primary";
  onClick?: () => void;
}

const iconColorClasses = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  purple: "text-purple",
  primary: "text-primary",
};

export function ActionCard({ icon: Icon, title, iconColor = "info", onClick }: ActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 rounded-lg bg-card p-4 card-shadow transition-all hover:card-shadow-hover hover:-translate-y-0.5 animate-fade-in"
    >
      <Icon className={cn("h-6 w-6", iconColorClasses[iconColor])} />
      <span className="text-sm font-medium text-card-foreground">{title}</span>
    </button>
  );
}
