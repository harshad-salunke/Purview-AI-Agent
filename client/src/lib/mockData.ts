import type { DataAsset, Recommendation, ChatSession, ChatMessage } from "@shared/schema";

// todo: remove mock functionality
export const mockDataAssets: DataAsset[] = [
  {
    id: "asset_001",
    name: "SalesDB",
    type: "Database",
    collection: "Finance",
    owner: "Raj Kumar",
    status: "Curated",
    description: "Primary database for sales transactions across all regions",
    sensitivityLabel: "Confidential",
    classification: "Finance Data",
    createdDate: "2024-01-15",
    lastModified: "2025-10-10",
    qualityScore: "95%",
    tags: ["Finance", "Sales", "Critical"],
    domain: "Finance",
    steward: "Raj Kumar",
    sourcePath: "/data/finance/salesdb",
    storageInfo: "Azure SQL Database",
    schema: [
      { field: "transaction_id", type: "string" },
      { field: "amount", type: "decimal" },
      { field: "date", type: "datetime" },
      { field: "customer_id", type: "string" }
    ],
    lineage: [
      { upstream: "Sales_Raw_Data", downstream: "Sales_Analytics_Report" }
    ]
  },
  {
    id: "asset_002",
    name: "Sales_Transactions_2024",
    type: "Table",
    collection: "Retail",
    owner: "Priya Sharma",
    status: "Pending Review",
    description: "Contains 2024 sales transaction records for retail stores",
    sensitivityLabel: "Confidential",
    classification: "Finance Data",
    createdDate: "2024-02-15",
    lastModified: "2025-10-10",
    qualityScore: "92%",
    tags: ["Finance", "Retail", "Critical"],
    domain: "Retail",
    steward: "Priya Sharma",
    sourcePath: "/data/retail/transactions_2024",
    storageInfo: "Azure Data Lake",
    schema: [
      { field: "transaction_id", type: "string" },
      { field: "store_id", type: "integer" },
      { field: "amount", type: "float" },
      { field: "date", type: "datetime" }
    ],
    lineage: [
      { upstream: "Sales_Raw_Data", downstream: "Sales_Analytics_Report" }
    ]
  },
  {
    id: "asset_003",
    name: "Sales_Analytics_Report",
    type: "Report",
    collection: "BI",
    owner: "Arun Patel",
    status: "Curated",
    description: "Monthly sales analytics and performance metrics",
    sensitivityLabel: "Internal",
    classification: "Business Intelligence",
    createdDate: "2024-03-01",
    lastModified: "2025-11-01",
    qualityScore: "98%",
    tags: ["BI", "Analytics", "Sales"],
    domain: "Business Intelligence",
    steward: "Arun Patel"
  },
  {
    id: "asset_004",
    name: "CustomerInfo",
    type: "Database",
    collection: "Marketing",
    owner: "Lisa Chen",
    status: "Curated",
    description: "Customer demographics and contact information",
    sensitivityLabel: "Highly Confidential",
    classification: "PII",
    createdDate: "2023-11-20",
    lastModified: "2025-10-15",
    qualityScore: "88%",
    tags: ["Marketing", "PII", "Customer"],
    domain: "Marketing",
    steward: "Lisa Chen"
  },
  {
    id: "asset_005",
    name: "FinanceData",
    type: "Dataset",
    collection: "Finance",
    owner: "Michael Johnson",
    status: "Curated",
    description: "Financial records and accounting data",
    sensitivityLabel: "Confidential",
    classification: "Finance Data",
    createdDate: "2024-04-10",
    lastModified: "2025-10-20",
    qualityScore: "90%",
    tags: ["Finance", "Accounting"]
  },
  {
    id: "asset_006",
    name: "HRRecords",
    type: "Database",
    collection: "HR",
    owner: "",
    status: "Unassigned",
    description: "Employee records and HR information",
    sensitivityLabel: "Highly Confidential",
    classification: "HR Data",
    createdDate: "2024-05-01",
    lastModified: "2025-09-30",
    qualityScore: "75%",
    tags: ["HR", "Employee", "PII"]
  },
  {
    id: "asset_007",
    name: "Inventory_DB",
    type: "Database",
    collection: "Operations",
    owner: "",
    status: "Unassigned",
    description: "Product inventory and warehouse data",
    sensitivityLabel: "Internal",
    classification: "Operations Data",
    createdDate: "2024-06-15",
    lastModified: "2025-10-05",
    qualityScore: "82%",
    tags: ["Operations", "Inventory"]
  }
];

export const mockRecommendations: Recommendation[] = [
  {
    id: "rec_001",
    title: "Data assets with no owner assigned",
    priority: "High",
    description: "5 assets don't have an owner assigned",
    affectedAssetCount: 5,
    affectedAssets: ["asset_006", "asset_007", "asset_008", "asset_009", "asset_010"]
  },
  {
    id: "rec_002",
    title: "Collections missing RBAC roles",
    priority: "Medium",
    description: "2 collections lack role configuration",
    affectedAssetCount: 2,
    affectedAssets: ["asset_002", "asset_006"]
  },
  {
    id: "rec_003",
    title: "Data products not yet created",
    priority: "Low",
    description: "3 eligible assets can form data products",
    affectedAssetCount: 3,
    affectedAssets: ["asset_001", "asset_002", "asset_003"]
  },
  {
    id: "rec_004",
    title: "Uncurated Data Assets",
    priority: "High",
    description: "7 assets are pending review or curation",
    affectedAssetCount: 7,
    affectedAssets: ["asset_002", "asset_006", "asset_007", "asset_011", "asset_012", "asset_013", "asset_014"]
  },
  {
    id: "rec_005",
    title: "Low Quality Data Assets",
    priority: "Medium",
    description: "4 assets have quality scores below 80%",
    affectedAssetCount: 4,
    affectedAssets: ["asset_006", "asset_007", "asset_011", "asset_012"]
  }
];

export const mockChatSessions: ChatSession[] = [
  {
    id: "session_001",
    agent: "Information Agent",
    timestamp: new Date(Date.now() - 3600000),
    preview: "Give me asset related to sales"
  },
  {
    id: "session_002",
    agent: "Data Curator Agent",
    timestamp: new Date(Date.now() - 7200000),
    preview: "Curate @SalesDB"
  },
  {
    id: "session_003",
    agent: "Information Agent",
    timestamp: new Date(Date.now() - 86400000),
    preview: "List all unassigned assets"
  }
];

export const suggestedQuestions = {
  "Information Agent": [
    "Give me asset related to sales",
    "Show metadata of @CustomerInfo",
    "List all unassigned assets",
    "Find assets with high sensitivity",
    "Show me recent data products"
  ],
  "Data Curator Agent": [
    "Curate @SalesDB",
    "Update owner for @HRRecords",
    "Add classification to @Inventory_DB",
    "Review pending assets",
    "Recommend me data products"
  ]
};
