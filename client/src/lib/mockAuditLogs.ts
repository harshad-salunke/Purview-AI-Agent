// todo: remove mock functionality
export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  assetType: string;
  assetName: string;
  details: string;
  status: "Success" | "Completed" | "Info" | "Modified" | "Suggested" | "Failed";
  metadata?: Record<string, any>;
}

export const mockAuditLogs: AuditLog[] = [
  {
    id: "AL-001",
    timestamp: "2025-11-06T10:42:00Z",
    user: "Data Curator Agent",
    action: "Curated",
    assetType: "Dataset",
    assetName: "Sales_Transactions_2025",
    details: "Schema standardized and validated by AI Agent",
    status: "Success",
    metadata: {
      changes: ["Added missing column descriptions", "Standardized date formats", "Validated data types"],
      confidence: 0.98
    }
  },
  {
    id: "AL-002",
    timestamp: "2025-11-06T09:15:00Z",
    user: "Admin",
    action: "Approved",
    assetType: "Dataset",
    assetName: "CRM_Leads_Data",
    details: "Approved after validation check",
    status: "Completed",
    metadata: {
      reviewer: "Admin",
      approvalStage: "Final",
      complianceCheck: "Passed"
    }
  },
  {
    id: "AL-003",
    timestamp: "2025-11-05T20:32:00Z",
    user: "Information Agent",
    action: "Fetched Info",
    assetType: "Dataset",
    assetName: "Finance_Dataset_2024",
    details: "Retrieved lineage and metadata successfully",
    status: "Info",
    metadata: {
      requestType: "Metadata Query",
      responseTime: "245ms"
    }
  },
  {
    id: "AL-004",
    timestamp: "2025-11-05T19:45:00Z",
    user: "Harshad",
    action: "Updated",
    assetType: "Data Product",
    assetName: "Sales Insights",
    details: "Lineage modified to include CRM data",
    status: "Modified",
    metadata: {
      previousLineage: ["Sales_Transactions_2025"],
      newLineage: ["Sales_Transactions_2025", "CRM_Leads_Data"]
    }
  },
  {
    id: "AL-005",
    timestamp: "2025-11-04T14:15:00Z",
    user: "AI Recommendation Agent",
    action: "Suggested Fix",
    assetType: "Collection",
    assetName: "Unassigned Collections",
    details: "Detected missing RBAC roles in 2 collections",
    status: "Suggested",
    metadata: {
      affectedCollections: ["Finance_Archive", "Marketing_Staging"],
      severity: "Medium",
      suggestedAction: "Assign default read role to authenticated users"
    }
  },
  {
    id: "AL-006",
    timestamp: "2025-11-04T11:30:00Z",
    user: "Data Curator Agent",
    action: "Created",
    assetType: "Data Product",
    assetName: "Revenue Forecasting Model",
    details: "Auto-generated data product from financial datasets",
    status: "Success",
    metadata: {
      sourcedFrom: ["Historical_Revenue_2020_2025"],
      confidence: 0.95
    }
  },
  {
    id: "AL-007",
    timestamp: "2025-11-04T09:22:00Z",
    user: "Sarah Chen",
    action: "Deleted",
    assetType: "Dataset",
    assetName: "Test_Data_Legacy",
    details: "Removed deprecated test dataset",
    status: "Completed",
    metadata: {
      reason: "Data retention policy - expired",
      backupCreated: true
    }
  },
  {
    id: "AL-008",
    timestamp: "2025-11-03T16:18:00Z",
    user: "Information Agent",
    action: "Fetched Info",
    assetType: "Collection",
    assetName: "Marketing Framework",
    details: "Retrieved collection structure and data products",
    status: "Info",
    metadata: {
      itemsReturned: 12,
      queryDuration: "189ms"
    }
  },
  {
    id: "AL-009",
    timestamp: "2025-11-03T14:55:00Z",
    user: "John Martinez",
    action: "Updated",
    assetType: "Dataset",
    assetName: "Customer_Engagement_Metrics",
    details: "Added new business glossary terms",
    status: "Modified",
    metadata: {
      termsAdded: ["Engagement Score", "Conversion Rate", "Bounce Rate"],
      totalTerms: 23
    }
  },
  {
    id: "AL-010",
    timestamp: "2025-11-03T10:45:00Z",
    user: "AI Recommendation Agent",
    action: "Suggested Fix",
    assetType: "Dataset",
    assetName: "Regional_Sales_Data",
    details: "Missing data quality rules detected",
    status: "Suggested",
    metadata: {
      suggestedRules: ["Non-null constraint on region_id", "Valid date range check"],
      severity: "High"
    }
  },
  {
    id: "AL-011",
    timestamp: "2025-11-02T17:30:00Z",
    user: "Data Curator Agent",
    action: "Curated",
    assetType: "Dataset",
    assetName: "Email_Campaign_Metrics",
    details: "Enriched metadata with AI-generated descriptions",
    status: "Success",
    metadata: {
      fieldsEnriched: 45,
      confidence: 0.92
    }
  },
  {
    id: "AL-012",
    timestamp: "2025-11-02T15:12:00Z",
    user: "Admin",
    action: "Approved",
    assetType: "Data Product",
    assetName: "Lead Conversion Pipeline",
    details: "Production deployment approved",
    status: "Completed",
    metadata: {
      environment: "Production",
      approver: "Admin",
      scheduledDeployment: "2025-11-03T00:00:00Z"
    }
  },
  {
    id: "AL-013",
    timestamp: "2025-11-02T11:05:00Z",
    user: "Lisa Wong",
    action: "Created",
    assetType: "Collection",
    assetName: "Sales Analytics Collection",
    details: "New collection framework for sales data products",
    status: "Success",
    metadata: {
      initialProducts: 3,
      owner: "SalesDept"
    }
  },
  {
    id: "AL-014",
    timestamp: "2025-11-01T16:40:00Z",
    user: "Information Agent",
    action: "Fetched Info",
    assetType: "Data Product",
    assetName: "Customer Engagement Analytics",
    details: "Lineage trace completed for impact analysis",
    status: "Info",
    metadata: {
      upstreamSources: 2,
      downstreamConsumers: 1
    }
  },
  {
    id: "AL-015",
    timestamp: "2025-11-01T14:20:00Z",
    user: "Data Curator Agent",
    action: "Updated",
    assetType: "Dataset",
    assetName: "CRM_Pipeline_Data",
    details: "Auto-detected schema changes and updated metadata",
    status: "Modified",
    metadata: {
      schemaChanges: ["Added column: last_contact_date", "Modified type: conversion_probability"],
      autoApproved: true
    }
  }
];
