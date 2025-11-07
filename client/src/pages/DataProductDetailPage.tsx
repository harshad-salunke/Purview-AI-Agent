import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { mockDataProducts } from "@/lib/mockDataProducts";
import type { DataProduct } from "@/lib/mockDataProducts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { LineageGraph } from "@/components/LineageGraph";
import { ArrowLeft, Database, Loader2 } from "lucide-react";

export default function DataProductDetailPage() {
  const [, params] = useRoute("/data-product/:id");
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [dataProduct, setDataProduct] = useState<DataProduct | null>(null);

  useEffect(() => {
    // todo: remove mock functionality - simulate async loading
    setIsLoading(true);
    setTimeout(() => {
      const productId = params?.id;
      let found: DataProduct | null = null;

      Object.values(mockDataProducts).forEach(products => {
        const product = products.find(p => p.dataProductId === productId);
        if (product) found = product;
      });

      setDataProduct(found);
      setIsLoading(false);
    }, 1000);
  }, [params?.id]);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-3 text-muted-foreground">Loading data product details...</span>
      </div>
    );
  }

  if (!dataProduct) {
    return (
      <div className="p-6">
        <p>Data product not found</p>
      </div>
    );
  }

  const importanceConfig = {
    High: { variant: "destructive" as const },
    Medium: { variant: "secondary" as const },
    Low: { variant: "outline" as const },
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Button 
        variant="ghost" 
        className="mb-4"
        onClick={() => setLocation('/data-products')}
        data-testid="button-back"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Data Products
      </Button>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <div className="p-3 rounded-lg bg-primary/10">
                <Database className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold mb-2" data-testid="text-product-name">
                  {dataProduct.dataProductName}
                </h1>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant={importanceConfig[dataProduct.importance].variant}>
                    {dataProduct.importance}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {dataProduct.dataProductId}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Curation Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Description</Label>
            <p className="text-sm" data-testid="text-description">
              {dataProduct.curationDetails.description}
            </p>
          </div>
          <div className="space-y-2">
            <Label>Business Value</Label>
            <p className="text-sm text-muted-foreground">
              {dataProduct.curationDetails.businessValue}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Curator</Label>
              <p className="text-sm">{dataProduct.curationDetails.curator}</p>
            </div>
            <div className="space-y-2">
              <Label>Last Curated On</Label>
              <p className="text-sm">
                {new Date(dataProduct.curationDetails.lastCuratedOn).toLocaleDateString()}
              </p>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Badge variant="default">{dataProduct.curationDetails.status}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="datasets" className="mb-6">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="datasets" data-testid="tab-datasets">Datasets</TabsTrigger>
          <TabsTrigger value="lineage" data-testid="tab-lineage">Lineage</TabsTrigger>
        </TabsList>

        <TabsContent value="datasets">
          <div className="grid gap-4">
            {dataProduct.datasets.map((dataset) => (
              <Card key={dataset.datasetId} data-testid={`card-dataset-${dataset.datasetId}`}>
                <CardHeader>
                  <CardTitle className="text-base">{dataset.datasetName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <Label className="text-xs">Records</Label>
                      <p className="text-sm font-medium">
                        {dataset.records.toLocaleString()}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Owner</Label>
                      <p className="text-sm">{dataset.owner}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Last Refreshed</Label>
                      <p className="text-sm">
                        {new Date(dataset.lastRefreshed).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-end">
                      <Button 
                        size="sm" 
                        variant="outline"
                        data-testid={`button-view-dataset-${dataset.datasetId}`}
                      >
                        View Dataset
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="lineage">
          <Card>
            <CardContent className="pt-6">
              <LineageGraph 
                nodes={dataProduct.lineage.nodes} 
                edges={dataProduct.lineage.edges} 
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
