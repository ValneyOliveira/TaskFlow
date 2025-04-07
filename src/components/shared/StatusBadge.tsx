
import { cn } from "@/lib/utils";
import { Status } from "@/types";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusConfig = (status: Status) => {
    switch (status) {
      case "pending":
        return {
          label: "Pendente",
          className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
        };
      case "in_progress":
        return {
          label: "Em Andamento",
          className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
        };
      case "completed":
        return {
          label: "Concluído",
          className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
        };
      case "canceled":
        return {
          label: "Cancelado",
          className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={cn("px-2 py-1 text-xs font-medium rounded-full", config.className, className)}>
      {config.label}
    </span>
  );
}