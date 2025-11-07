import { LineageGraph } from '../LineageGraph'

export default function LineageGraphExample() {
  const mockLineage = {
    nodes: [
      { id: "CRM_Leads_Data", type: "Source" as const, x: 100, y: 100 },
      { id: "Sales_Transactions_2025", type: "Source" as const, x: 100, y: 300 },
      { id: "Sales_Performance_Insights", type: "DataProduct" as const, x: 400, y: 200 },
      { id: "Dashboard_PowerBI", type: "Consumer" as const, x: 700, y: 200 }
    ],
    edges: [
      { source: "CRM_Leads_Data", target: "Sales_Performance_Insights" },
      { source: "Sales_Transactions_2025", target: "Sales_Performance_Insights" },
      { source: "Sales_Performance_Insights", target: "Dashboard_PowerBI" }
    ]
  };

  return (
    <div className="p-4 bg-background">
      <LineageGraph nodes={mockLineage.nodes} edges={mockLineage.edges} />
    </div>
  )
}
