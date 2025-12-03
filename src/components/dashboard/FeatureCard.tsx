import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
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

export function FeatureCard({ icon: Icon, title, iconColor = "info", onClick }: FeatureCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-3 rounded-lg bg-card p-6 card-shadow transition-all hover:card-shadow-hover hover:-translate-y-0.5 animate-fade-in"
    >
      <Icon className={cn("h-8 w-8", iconColorClasses[iconColor])} />
      <span className="text-sm font-medium text-card-foreground">{title}</span>
    </button>
  );
}
