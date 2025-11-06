import { CurationCard } from '../CurationCard'

export default function CurationCardExample() {
  const asset = {
    name: "SalesDB",
    description: "Primary database for sales transactions",
    owner: "Raj Kumar",
    sensitivityLabel: "Confidential",
    classification: "Finance Data",
  };

  return (
    <div className="p-4 bg-background max-w-md">
      <CurationCard 
        asset={asset} 
        onApprove={(data) => console.log('Approved:', data)} 
        onCancel={() => console.log('Cancelled')} 
      />
    </div>
  )
}
