import type { Recommendation } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";

interface RecommendationCardProps {
  recommendation: Recommendation;
  onFix: () => void;
}

const priorityConfig = {
  High: { variant: "destructive" as const, icon: AlertCircle, color: "text-red-500" },
  Medium: { variant: "secondary" as const, icon: AlertTriangle, color: "text-orange-500" },
  Low: { variant: "outline" as const, icon: Info, color: "text-blue-500" },
};

export function RecommendationCard({ recommendation, onFix }: RecommendationCardProps) {
  const config = priorityConfig[recommendation.priority];
  const Icon = config.icon;

  return (
    <Card className="hover-elevate transition-all duration-300" data-testid={`card-recommendation-${recommendation.id}`}>
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${config.color}`} />
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base font-semibold">{recommendation.title}</CardTitle>
          </div>
        </div>
        <Badge variant={config.variant} className="flex-shrink-0">
          {recommendation.priority}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{recommendation.description}</p>
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-muted-foreground">
            {recommendation.affectedAssetCount} {recommendation.affectedAssetCount === 1 ? 'asset' : 'assets'} affected
          </span>
          <Button size="sm" onClick={onFix} data-testid={`button-fix-${recommendation.id}`}>
            Fix
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
