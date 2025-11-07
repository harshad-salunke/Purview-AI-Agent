import { useState, useEffect, useMemo } from "react";
import { mockAuditLogs } from "@/lib/mockAuditLogs";
import type { AuditLog } from "@/lib/mockAuditLogs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AuditLogDrawer } from "@/components/AuditLogDrawer";
import { Download, Loader2, Search, Activity, CheckCircle, AlertCircle, Info } from "lucide-react";

const statusConfig = {
  Success: { variant: "default" as const, icon: "✅" },
  Completed: { variant: "default" as const, icon: "🟢" },
  Info: { variant: "secondary" as const, icon: "🔵" },
  Modified: { variant: "secondary" as const, icon: "🟠" },
  Suggested: { variant: "outline" as const, icon: "🟡" },
  Failed: { variant: "destructive" as const, icon: "❌" },
};

export default function AuditPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<string>("all");
  const [selectedAction, setSelectedAction] = useState<string>("all");
  const [selectedAssetType, setSelectedAssetType] = useState<string>("all");
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;

  useEffect(() => {
    // todo: remove mock functionality - simulate async loading
    setIsLoading(true);
    setTimeout(() => {
      setLogs(mockAuditLogs);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Extract unique filter values
  const uniqueUsers = useMemo(() => {
    return Array.from(new Set(logs.map(log => log.user))).sort();
  }, [logs]);

  const uniqueActions = useMemo(() => {
    return Array.from(new Set(logs.map(log => log.action))).sort();
  }, [logs]);

  const uniqueAssetTypes = useMemo(() => {
    return Array.from(new Set(logs.map(log => log.assetType))).sort();
  }, [logs]);

  // Filter logs
  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchesSearch = searchQuery === "" || 
        log.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.details.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesUser = selectedUser === "all" || log.user === selectedUser;
      const matchesAction = selectedAction === "all" || log.action === selectedAction;
      const matchesAssetType = selectedAssetType === "all" || log.assetType === selectedAssetType;

      return matchesSearch && matchesUser && matchesAction && matchesAssetType;
    });
  }, [logs, searchQuery, selectedUser, selectedAction, selectedAssetType]);

  // Calculate summary stats
  const todayLogs = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return logs.filter(log => new Date(log.timestamp) >= today);
  }, [logs]);

  const summary = useMemo(() => {
    const curated = todayLogs.filter(log => log.action === "Curated").length;
    const approved = todayLogs.filter(log => log.action === "Approved").length;
    const updated = todayLogs.filter(log => log.action === "Updated").length;
    return { curated, approved, updated };
  }, [todayLogs]);

  // Paginate filtered logs
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * logsPerPage,
    currentPage * logsPerPage
  );

  const handleRowClick = (log: AuditLog) => {
    setSelectedLog(log);
    setDrawerOpen(true);
  };

  const handleExport = () => {
    // todo: remove mock functionality
    console.log('Export audit logs as CSV');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">
          Audit & Activity Logs
        </h1>
        <p className="text-muted-foreground">
          Track all user and system activities across your data governance platform
        </p>
      </div>

      {summary.curated + summary.approved + summary.updated > 0 && (
        <Card className="mb-6 bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium mb-1">
                  Today's Activity Summary
                </p>
                <p className="text-sm text-muted-foreground">
                  {summary.curated} curated, {summary.approved} approved, {summary.updated} updated
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Asset name or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                  data-testid="input-search"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="user-filter">User / Agent</Label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger id="user-filter" data-testid="select-user">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  {uniqueUsers.map(user => (
                    <SelectItem key={user} value={user}>{user}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="action-filter">Action Type</Label>
              <Select value={selectedAction} onValueChange={setSelectedAction}>
                <SelectTrigger id="action-filter" data-testid="select-action">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  {uniqueActions.map(action => (
                    <SelectItem key={action} value={action}>{action}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="asset-filter">Asset Type</Label>
              <Select value={selectedAssetType} onValueChange={setSelectedAssetType}>
                <SelectTrigger id="asset-filter" data-testid="select-asset-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {uniqueAssetTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>&nbsp;</Label>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleExport}
                data-testid="button-export"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Logs
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-3 text-muted-foreground">Loading audit logs...</span>
        </div>
      ) : (
        <>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>User / Agent</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Target Asset</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedLogs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                          No audit logs found matching your filters
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedLogs.map((log) => {
                        const config = statusConfig[log.status];
                        return (
                          <TableRow
                            key={log.id}
                            className="cursor-pointer hover-elevate"
                            onClick={() => handleRowClick(log)}
                            data-testid={`row-log-${log.id}`}
                          >
                            <TableCell className="font-mono text-sm">
                              {new Date(log.timestamp).toLocaleString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </TableCell>
                            <TableCell>{log.user}</TableCell>
                            <TableCell>{log.action}</TableCell>
                            <TableCell>
                              <div className="flex flex-col gap-1">
                                <span className="font-medium">{log.assetName}</span>
                                <span className="text-xs text-muted-foreground">{log.assetType}</span>
                              </div>
                            </TableCell>
                            <TableCell className="max-w-xs truncate">
                              {log.details}
                            </TableCell>
                            <TableCell>
                              <Badge variant={config.variant}>
                                <span className="mr-1">{config.icon}</span>
                                {log.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                Showing {((currentPage - 1) * logsPerPage) + 1} to {Math.min(currentPage * logsPerPage, filteredLogs.length)} of {filteredLogs.length} logs
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  data-testid="button-prev-page"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  data-testid="button-next-page"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      <AuditLogDrawer
        log={selectedLog}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </div>
  );
}
