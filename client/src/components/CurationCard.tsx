import { useState } from "react";
import type { DataAsset } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface CurationCardProps {
  asset: Partial<DataAsset>;
  onApprove: (data: Partial<DataAsset>) => void;
  onCancel: () => void;
}

export function CurationCard({ asset, onApprove, onCancel }: CurationCardProps) {
  const [formData, setFormData] = useState({
    description: asset.description || "",
    owner: asset.owner || "",
    sensitivityLabel: asset.sensitivityLabel || "",
    classification: asset.classification || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApprove(formData);
  };

  return (
    <Card className="border-primary/50" data-testid="card-curation">
      <CardHeader>
        <CardTitle className="text-lg">Curate {asset.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              data-testid="input-description"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="owner">Owner</Label>
            <Input
              id="owner"
              value={formData.owner}
              onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
              data-testid="input-owner"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sensitivity">Sensitivity Label</Label>
            <Input
              id="sensitivity"
              value={formData.sensitivityLabel}
              onChange={(e) => setFormData({ ...formData, sensitivityLabel: e.target.value })}
              data-testid="input-sensitivity"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="classification">Classification</Label>
            <Input
              id="classification"
              value={formData.classification}
              onChange={(e) => setFormData({ ...formData, classification: e.target.value })}
              data-testid="input-classification"
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="flex-1" data-testid="button-approve">
              <Check className="w-4 h-4 mr-2" />
              Approve
            </Button>
            <Button type="button" variant="outline" className="flex-1" onClick={onCancel} data-testid="button-cancel">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
