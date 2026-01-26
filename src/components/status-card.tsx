import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { STATUS_CONFIG } from "@/config/status-config";

export function StatusCard({ label, value }: { label: string; value: number }) {
  const status = STATUS_CONFIG[label as keyof typeof STATUS_CONFIG];

  if (!status) return null;

  const Icon = status.icon;

  return (
    <Card
      className={`
        w-full
        ${status.styles.card}
        transition
        hover:shadow-md
      `}
    >
      <CardHeader className="space-y-2">
        <CardTitle className={status.styles.title}>{label}</CardTitle>

        <div className={`flex items-center gap-2 ${status.styles.description}`}>
          <Icon className="h-5 w-5" />
          <CardDescription>{value} tasks</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}
