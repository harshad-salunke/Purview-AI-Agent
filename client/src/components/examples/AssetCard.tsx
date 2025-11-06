import { AssetCard } from '../AssetCard'

export default function AssetCardExample() {
  const asset = {
    id: "asset_001",
    name: "SalesDB",
    type: "Database" as const,
    collection: "Finance",
    owner: "Raj Kumar",
    status: "Curated" as const,
    description: "Primary database for sales transactions across all regions",
    sensitivityLabel: "Confidential",
    classification: "Finance Data",
    createdDate: "2024-01-15",
    lastModified: "2025-10-10",
    qualityScore: "95%",
    tags: ["Finance", "Sales", "Critical"],
  };

  return (
    <div className="p-4 bg-background max-w-md">
      <AssetCard asset={asset} onViewMore={() => console.log('View more clicked')} />
    </div>
  )
}
