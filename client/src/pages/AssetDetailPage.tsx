import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import type { DataAsset } from "@shared/schema";
import { mockDataAssets } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Edit, Check, X, Database, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AssetDetailPage() {
  const [, params] = useRoute("/asset/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const assetId = params?.id;

  // todo: remove mock functionality
  const originalAsset = mockDataAssets.find(a => a.id === assetId);
  const [asset, setAsset] = useState<DataAsset | undefined>(originalAsset);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<DataAsset>>({});

  if (!asset) {
    return (
      <div className="p-6">
        <p>Asset not found</p>
      </div>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...asset });
  };

  const handleSave = () => {
    setAsset({ ...asset, ...editData } as DataAsset);
    setIsEditing(false);
    toast({
      title: "Success",
      description: "Asset metadata updated successfully",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
  };

  const relatedAssets = mockDataAssets.filter(a => 
    a.id !== asset.id && (a.collection === asset.collection || a.tags.some(t => asset.tags.includes(t)))
  ).slice(0, 3);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Button 
        variant="ghost" 
        className="mb-4"
        onClick={() => setLocation('/')}
        data-testid="button-back"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Chat
      </Button>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <div className="p-3 rounded-lg bg-primary/10">
                <Database className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold mb-2" data-testid="text-asset-name">{asset.name}</h1>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary">{asset.type}</Badge>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">Collection: {asset.collection}</span>
                  <span className="text-muted-foreground">•</span>
                  <Badge variant={asset.status === "Curated" ? "default" : "destructive"}>
                    {asset.status}
                  </Badge>
                </div>
              </div>
            </div>
            
            {!isEditing ? (
              <Button onClick={handleEdit} data-testid="button-edit">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSave} data-testid="button-save">
                  <Check className="w-4 h-4 mr-2" />
                  Approve
                </Button>
                <Button variant="outline" onClick={handleCancel} data-testid="button-cancel-edit">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="mb-6">
        <TabsList className="grid w-full grid-cols-6 mb-4">
          <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
          <TabsTrigger value="technical" data-testid="tab-technical">Technical</TabsTrigger>
          <TabsTrigger value="business" data-testid="tab-business">Business</TabsTrigger>
          <TabsTrigger value="quality" data-testid="tab-quality">Quality</TabsTrigger>
          <TabsTrigger value="lineage" data-testid="tab-lineage">Lineage</TabsTrigger>
          <TabsTrigger value="activity" data-testid="tab-activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label>Description</Label>
                {isEditing ? (
                  <Input
                    value={editData.description || asset.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    data-testid="input-edit-description"
                  />
                ) : (
                  <p className="text-sm" data-testid="text-description">{asset.description}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Owner</Label>
                  {isEditing ? (
                    <Input
                      value={editData.owner || asset.owner}
                      onChange={(e) => setEditData({ ...editData, owner: e.target.value })}
                      data-testid="input-edit-owner"
                    />
                  ) : (
                    <p className="text-sm" data-testid="text-owner">{asset.owner || "Unassigned"}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Collection</Label>
                  <p className="text-sm">{asset.collection}</p>
                </div>
                <div className="space-y-2">
                  <Label>Sensitivity Label</Label>
                  {isEditing ? (
                    <Input
                      value={editData.sensitivityLabel || asset.sensitivityLabel}
                      onChange={(e) => setEditData({ ...editData, sensitivityLabel: e.target.value })}
                      data-testid="input-edit-sensitivity"
                    />
                  ) : (
                    <p className="text-sm">{asset.sensitivityLabel}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Classification</Label>
                  {isEditing ? (
                    <Input
                      value={editData.classification || asset.classification}
                      onChange={(e) => setEditData({ ...editData, classification: e.target.value })}
                      data-testid="input-edit-classification"
                    />
                  ) : (
                    <p className="text-sm">{asset.classification}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technical">
          <Card>
            <CardContent className="pt-6 space-y-4">
              {asset.schema && (
                <div className="space-y-2">
                  <Label>Schema</Label>
                  <div className="rounded-md border">
                    <table className="w-full">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium">Field</th>
                          <th className="px-4 py-2 text-left text-sm font-medium">Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {asset.schema.map((field, idx) => (
                          <tr key={idx} className="border-t">
                            <td className="px-4 py-2 text-sm">{field.field}</td>
                            <td className="px-4 py-2 text-sm font-mono text-muted-foreground">{field.type}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {asset.sourcePath && (
                <div className="space-y-2">
                  <Label>Source Path</Label>
                  <p className="text-sm font-mono bg-muted px-3 py-2 rounded-md">{asset.sourcePath}</p>
                </div>
              )}
              {asset.storageInfo && (
                <div className="space-y-2">
                  <Label>Storage Info</Label>
                  <p className="text-sm">{asset.storageInfo}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label>Domain</Label>
                <p className="text-sm">{asset.domain || "Not specified"}</p>
              </div>
              <div className="space-y-2">
                <Label>Steward</Label>
                <p className="text-sm">{asset.steward || "Not assigned"}</p>
              </div>
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex gap-2 flex-wrap">
                  {asset.tags.map(tag => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label>Quality Score</Label>
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-bold text-primary">{asset.qualityScore}</div>
                  <p className="text-sm text-muted-foreground">Overall data quality rating</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Created Date</Label>
                  <p className="text-sm">{new Date(asset.createdDate).toLocaleDateString()}</p>
                </div>
                <div className="space-y-2">
                  <Label>Last Modified</Label>
                  <p className="text-sm">{new Date(asset.lastModified).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lineage">
          <Card>
            <CardContent className="pt-6">
              {asset.lineage && asset.lineage.length > 0 ? (
                <div className="space-y-4">
                  <Label>Data Flow</Label>
                  {asset.lineage.map((line, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-muted rounded-md">
                      <Badge variant="outline">{line.upstream}</Badge>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      <Badge variant="outline">{asset.name}</Badge>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      <Badge variant="outline">{line.downstream}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No lineage information available</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3 pb-3 border-b">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Asset created</p>
                    <p className="text-xs text-muted-foreground">{new Date(asset.createdDate).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pb-3 border-b">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Metadata updated</p>
                    <p className="text-xs text-muted-foreground">{new Date(asset.lastModified).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {relatedAssets.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Related Assets</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {relatedAssets.map(related => (
              <Card 
                key={related.id} 
                className="hover-elevate cursor-pointer transition-all duration-300"
                onClick={() => setLocation(`/asset/${related.id}`)}
                data-testid={`card-related-${related.id}`}
              >
                <CardHeader>
                  <CardTitle className="text-base">{related.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">{related.type}</Badge>
                    <span className="text-xs text-muted-foreground">{related.collection}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{related.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
