import type { AuditLog } from "@/lib/mockAuditLogs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Calendar, FileText, Activity, CheckCircle } from "lucide-react";

interface AuditLogDrawerProps {
  log: AuditLog | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusConfig = {
  Success: { variant: "default" as const, icon: "✅" },
  Completed: { variant: "default" as const, icon: "🟢" },
  Info: { variant: "secondary" as const, icon: "🔵" },
  Modified: { variant: "secondary" as const, icon: "🟠" },
  Suggested: { variant: "outline" as const, icon: "🟡" },
  Failed: { variant: "destructive" as const, icon: "❌" },
};

export function AuditLogDrawer({ log, open, onOpenChange }: AuditLogDrawerProps) {
  if (!log) return null;

  const config = statusConfig[log.status];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Activity Details
          </SheetTitle>
          <SheetDescription>
            Complete information about this audit log entry
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="flex-1 min-w-0">
                <Label className="text-xs text-muted-foreground">User / Agent</Label>
                <p className="text-sm font-medium">{log.user}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="flex-1 min-w-0">
                <Label className="text-xs text-muted-foreground">Timestamp</Label>
                <p className="text-sm">
                  {new Date(log.timestamp).toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="flex-1 min-w-0">
                <Label className="text-xs text-muted-foreground">Action</Label>
                <p className="text-sm font-medium">{log.action}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="flex-1 min-w-0">
                <Label className="text-xs text-muted-foreground">Target Asset</Label>
                <p className="text-sm">{log.assetName}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Type: {log.assetType}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="flex-1 min-w-0">
                <Label className="text-xs text-muted-foreground">Status</Label>
                <div className="mt-1">
                  <Badge variant={config.variant}>
                    <span className="mr-1">{config.icon}</span>
                    {log.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Details</Label>
            <p className="text-sm text-muted-foreground">{log.details}</p>
          </div>

          {log.metadata && Object.keys(log.metadata).length > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <Label>Metadata</Label>
                <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                  <pre className="text-xs">
                    {JSON.stringify(log.metadata, null, 2)}
                  </pre>
                </div>
              </div>
            </>
          )}

          <Separator />

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" data-testid="button-acknowledge">
              Acknowledge
            </Button>
            <Button variant="outline" className="flex-1" data-testid="button-revert">
              Revert
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
