import { useState } from "react";
import { useLocation } from "wouter";
import { mockDataAssets } from "@/lib/mockData";
import { AssetCard } from "@/components/AssetCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

export default function DataAssetsPage() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [collectionFilter, setCollectionFilter] = useState("All");

  const collections = ["All", ...Array.from(new Set(mockDataAssets.map(a => a.collection)))];

  const filteredAssets = mockDataAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCollection = collectionFilter === "All" || asset.collection === collectionFilter;
    return matchesSearch && matchesCollection;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">Data Assets</h1>
        <p className="text-muted-foreground">Browse and manage all data assets in Purview</p>
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
        <Select value={collectionFilter} onValueChange={setCollectionFilter}>
          <SelectTrigger className="w-48" data-testid="select-collection-filter">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {collections.map(collection => (
              <SelectItem key={collection} value={collection}>{collection}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredAssets.map(asset => (
          <AssetCard
            key={asset.id}
            asset={asset}
            onViewMore={() => setLocation(`/asset/${asset.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
