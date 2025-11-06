import { useState } from "react";
import { useLocation } from "wouter";
import type { Priority } from "@shared/schema";
import { RecommendationCard } from "@/components/RecommendationCard";
import { mockRecommendations } from "@/lib/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function RecommendationsPage() {
  const [, setLocation] = useLocation();
  const [filterPriority, setFilterPriority] = useState<Priority | "All">("All");

  const filteredRecommendations = filterPriority === "All"
    ? mockRecommendations
    : mockRecommendations.filter(r => r.priority === filterPriority);

  const counts = {
    High: mockRecommendations.filter(r => r.priority === "High").length,
    Medium: mockRecommendations.filter(r => r.priority === "Medium").length,
    Low: mockRecommendations.filter(r => r.priority === "Low").length,
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">Purview Recommendations</h1>
        <p className="text-muted-foreground">
          AI-driven recommendations for governance, ownership, and data quality
        </p>
      </div>

      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <Select value={filterPriority} onValueChange={(v) => setFilterPriority(v as Priority | "All")}>
          <SelectTrigger className="w-48" data-testid="select-priority-filter">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Priorities</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2 ml-auto">
          <Badge variant="destructive" data-testid="badge-high-count">
            High: {counts.High}
          </Badge>
          <Badge variant="secondary" data-testid="badge-medium-count">
            Medium: {counts.Medium}
          </Badge>
          <Badge variant="outline" data-testid="badge-low-count">
            Low: {counts.Low}
          </Badge>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredRecommendations.map(rec => (
          <RecommendationCard
            key={rec.id}
            recommendation={rec}
            onFix={() => setLocation(`/recommendation/${rec.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
