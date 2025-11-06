import { RecommendationCard } from '../RecommendationCard'

export default function RecommendationCardExample() {
  const recommendation = {
    id: "rec_001",
    title: "Data assets with no owner assigned",
    priority: "High" as const,
    description: "5 assets don't have an owner assigned",
    affectedAssetCount: 5,
    affectedAssets: ["asset_006", "asset_007"],
  };

  return (
    <div className="p-4 bg-background max-w-md">
      <RecommendationCard recommendation={recommendation} onFix={() => console.log('Fix clicked')} />
    </div>
  )
}
