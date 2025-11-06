import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import type { AssetStatus } from "@shared/schema";
import { mockRecommendations, mockDataAssets } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ArrowLeft, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function RecommendationDetailPage() {
  const [, params] = useRoute("/recommendation/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const recId = params?.id;

  // todo: remove mock functionality
  const recommendation = mockRecommendations.find(r => r.id === recId);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<AssetStatus | "All">("All");
  const [assetStatuses, setAssetStatuses] = useState<Record<string, AssetStatus>>({});
  const [fixDialogOpen, setFixDialogOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [fixFormData, setFixFormData] = useState({ owner: "", classification: "" });

  if (!recommendation) {
    return <div className="p-6">Recommendation not found</div>;
  }

  const affectedAssets = mockDataAssets.filter(a => 
    recommendation.affectedAssets.includes(a.id)
  );

  const filteredAssets = affectedAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.description.toLowerCase().includes(searchQuery.toLowerCase());
    const status = assetStatuses[asset.id] || asset.status;
    const matchesStatus = statusFilter === "All" || status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleFix = (asset: any) => {
    setSelectedAsset(asset);
    setFixFormData({ 
      owner: asset.owner || "", 
      classification: asset.classification || "" 
    });
    setFixDialogOpen(true);
  };

  const handleSaveFix = () => {
    if (selectedAsset) {
      setAssetStatuses(prev => ({ ...prev, [selectedAsset.id]: "Curated" as AssetStatus }));
      toast({
        title: "Success",
        description: "Fix applied successfully",
      });
    }
    setFixDialogOpen(false);
    setSelectedAsset(null);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Button 
        variant="ghost" 
        className="mb-4"
        onClick={() => setLocation('/recommendations')}
        data-testid="button-back"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Recommendations
      </Button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">Recommendation Details</h1>
        <p className="text-xl text-muted-foreground mb-4">{recommendation.title}</p>
        <div className="flex items-center gap-2">
          <Badge variant={recommendation.priority === "High" ? "destructive" : recommendation.priority === "Medium" ? "secondary" : "outline"}>
            {recommendation.priority}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {recommendation.affectedAssetCount} {recommendation.affectedAssetCount === 1 ? 'asset' : 'assets'} affected
          </span>
        </div>
      </div>

      <div className="flex gap-4 mb-6 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search"
          />
        </div>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as AssetStatus | "All")}>
          <SelectTrigger className="w-48" data-testid="select-status-filter">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            <SelectItem value="Curated">Curated</SelectItem>
            <SelectItem value="Pending Review">Pending Review</SelectItem>
            <SelectItem value="Unassigned">Unassigned</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredAssets.map(asset => {
          const currentStatus = assetStatuses[asset.id] || asset.status;
          return (
            <Card key={asset.id} className="hover-elevate transition-all duration-300" data-testid={`card-asset-${asset.id}`}>
              <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-3">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg">{asset.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <Badge variant="secondary" className="text-xs">{asset.type}</Badge>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{asset.collection}</span>
                  </div>
                </div>
                <Badge variant={currentStatus === "Curated" ? "default" : "destructive"}>
                  {currentStatus}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{asset.description}</p>
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Owner:</span> {asset.owner || "Unassigned"}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setLocation(`/asset/${asset.id}`)}
                      data-testid={`button-view-${asset.id}`}
                    >
                      View More
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleFix(asset)}
                      disabled={currentStatus === "Curated"}
                      data-testid={`button-fix-${asset.id}`}
                    >
                      Fix
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={fixDialogOpen} onOpenChange={setFixDialogOpen}>
        <DialogContent data-testid="dialog-fix">
          <DialogHeader>
            <DialogTitle>Fix Asset: {selectedAsset?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="fix-owner">Assign Owner</Label>
              <Input
                id="fix-owner"
                value={fixFormData.owner}
                onChange={(e) => setFixFormData({ ...fixFormData, owner: e.target.value })}
                placeholder="Enter owner name"
                data-testid="input-fix-owner"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fix-classification">Classification</Label>
              <Input
                id="fix-classification"
                value={fixFormData.classification}
                onChange={(e) => setFixFormData({ ...fixFormData, classification: e.target.value })}
                placeholder="Enter classification"
                data-testid="input-fix-classification"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFixDialogOpen(false)} data-testid="button-cancel-fix">
              Cancel
            </Button>
            <Button onClick={handleSaveFix} data-testid="button-save-fix">
              Save Fix
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
