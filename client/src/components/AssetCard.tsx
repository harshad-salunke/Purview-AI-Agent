import type { DataAsset } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, FileText, BarChart3, Table, Folder } from "lucide-react";

interface AssetCardProps {
  asset: DataAsset;
  onViewMore: () => void;
}

const typeIcons = {
  Database: Database,
  File: FileText,
  Report: BarChart3,
  Table: Table,
  Dataset: Folder,
};

export function AssetCard({ asset, onViewMore }: AssetCardProps) {
  const Icon = typeIcons[asset.type];

  return (
    <Card className="hover-elevate transition-all duration-300" data-testid={`card-asset-${asset.id}`}>
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-2">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="p-2 rounded-md bg-primary/10">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base font-semibold truncate">{asset.name}</CardTitle>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <Badge variant="secondary" className="text-xs">{asset.type}</Badge>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{asset.collection}</span>
            </div>
          </div>
        </div>
        <Badge 
          variant={asset.status === "Curated" ? "default" : asset.status === "Pending Review" ? "secondary" : "destructive"}
          className="flex-shrink-0"
        >
          {asset.status}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{asset.description}</p>
        <div className="flex items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground">
            <span className="font-medium">Owner:</span> {asset.owner || "Unassigned"}
          </div>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={onViewMore}
            data-testid={`button-view-more-${asset.id}`}
          >
            View More
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
