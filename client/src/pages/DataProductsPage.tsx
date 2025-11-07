import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { mockDataProducts } from "@/lib/mockDataProducts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

type Framework = "Finance Framework" | "Marketing Framework" | "Sales Framework";

export default function DataProductsPage() {
  const [, setLocation] = useLocation();
  const [selectedFramework, setSelectedFramework] = useState<Framework | "">("");
  const [isLoading, setIsLoading] = useState(false);
  const [dataProducts, setDataProducts] = useState<any[]>([]);

  useEffect(() => {
    if (selectedFramework) {
      setIsLoading(true);
      // todo: remove mock functionality - simulate async loading
      setTimeout(() => {
        setDataProducts(mockDataProducts[selectedFramework] || []);
        setIsLoading(false);
      }, 1000);
    } else {
      setDataProducts([]);
    }
  }, [selectedFramework]);

  const importanceConfig = {
    High: { variant: "destructive" as const, color: "text-red-500" },
    Medium: { variant: "secondary" as const, color: "text-orange-500" },
    Low: { variant: "outline" as const, color: "text-blue-500" },
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">Data Product Agent</h1>
        <p className="text-muted-foreground">
          Discover and explore auto-curated data products across your organization
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <Label htmlFor="framework-select">Select Collection Framework</Label>
            <Select value={selectedFramework} onValueChange={(v) => setSelectedFramework(v as Framework)}>
              <SelectTrigger id="framework-select" data-testid="select-framework">
                <SelectValue placeholder="Choose a framework to view data products" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Finance Framework">Finance Framework</SelectItem>
                <SelectItem value="Marketing Framework">Marketing Framework</SelectItem>
                <SelectItem value="Sales Framework">Sales Framework</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-3 text-muted-foreground">Loading data products...</span>
        </div>
      )}

      {!isLoading && dataProducts.length > 0 && (
        <div className="grid gap-4">
          {dataProducts.map((product) => {
            const config = importanceConfig[product.importance as keyof typeof importanceConfig];
            return (
              <Card 
                key={product.dataProductId} 
                className="hover-elevate transition-all duration-300"
                data-testid={`card-product-${product.dataProductId}`}
              >
                <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-3">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg mb-2">{product.dataProductName}</CardTitle>
                    <p className="text-sm text-muted-foreground">{product.shortDescription}</p>
                  </div>
                  <Badge variant={config.variant}>
                    {product.importance}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Curator:</span> {product.curationDetails.curator}
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => setLocation(`/data-product/${product.dataProductId}`)}
                      data-testid={`button-view-details-${product.dataProductId}`}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {!isLoading && !selectedFramework && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">
            Select a collection framework above to view available data products
          </p>
        </Card>
      )}

      {!isLoading && selectedFramework && dataProducts.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">
            No data products found for {selectedFramework}
          </p>
        </Card>
      )}
    </div>
  );
}
