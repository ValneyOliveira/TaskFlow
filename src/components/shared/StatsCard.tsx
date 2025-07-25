import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  change?: {
    value: number;
    positive: boolean;
  };
  className?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  change,
  className,
}: StatsCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        {change && (
          <div className="flex items-center mt-1">
            <span
              className={cn(
                "text-xs font-medium",
                change.positive ? "text-green-600" : "text-red-600"
              )}
            >
              {change.positive ? "+" : "-"}
              {Math.abs(change.value)}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">desde o último mês</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}