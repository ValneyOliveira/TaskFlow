import { cn } from "@/lib/utils";

interface PriorityBadgeProps {
  priority: "low" | "medium" | "high";
  className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const getPriorityConfig = (priority: "low" | "medium" | "high") => {
    switch (priority) {
      case "low":
        return {
          label: "Baixa",
          className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
        };
      case "medium":
        return {
          label: "Média",
          className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
        };
      case "high":
        return {
          label: "Alta",
          className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
        };
    }
  };

  const config = getPriorityConfig(priority);

  return (
    <span className={cn("px-2 py-1 text-xs font-medium rounded-full", config.className, className)}>
      {config.label}
    </span>
  );
}