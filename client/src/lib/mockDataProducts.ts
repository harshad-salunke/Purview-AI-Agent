// todo: remove mock functionality
export interface Dataset {
  datasetId: string;
  datasetName: string;
  records: number;
  owner: string;
  lastRefreshed: string;
}

export interface LineageNode {
  id: string;
  type: "Source" | "DataProduct" | "Consumer";
  x: number;
  y: number;
}

export interface LineageEdge {
  source: string;
  target: string;
}

export interface DataProduct {
  dataProductId: string;
  dataProductName: string;
  importance: "High" | "Medium" | "Low";
  shortDescription: string;
  curationDetails: {
    description: string;
    businessValue: string;
    curator: string;
    lastCuratedOn: string;
    status: string;
  };
  datasets: Dataset[];
  lineage: {
    nodes: LineageNode[];
    edges: LineageEdge[];
  };
}

export const mockDataProducts: Record<string, DataProduct[]> = {
  "Finance Framework": [
    {
      dataProductId: "DP-001",
      dataProductName: "Sales Performance Insights",
      importance: "High",
      shortDescription: "Unified visibility into regional and product-wise sales performance",
      curationDetails: {
        description: "This data product provides unified visibility into regional and product-wise sales performance, combining transactional and CRM data.",
        businessValue: "Helps leadership understand revenue trends, identify top-performing regions, and optimize sales strategy.",
        curator: "AI Data Product Agent",
        lastCuratedOn: "2025-11-05",
        status: "Auto-curated and validated"
      },
      datasets: [
        {
          datasetId: "DS-101",
          datasetName: "Sales_Transactions_2025",
          records: 123456,
          owner: "FinanceDept",
          lastRefreshed: "2025-11-04"
        },
        {
          datasetId: "DS-102",
          datasetName: "CRM_Leads_Data",
          records: 78234,
          owner: "MarketingDept",
          lastRefreshed: "2025-11-03"
        }
      ],
      lineage: {
        nodes: [
          { id: "CRM_Leads_Data", type: "Source", x: 100, y: 100 },
          { id: "Sales_Transactions_2025", type: "Source", x: 100, y: 300 },
          { id: "Sales_Performance_Insights", type: "DataProduct", x: 400, y: 200 },
          { id: "Dashboard_PowerBI", type: "Consumer", x: 700, y: 200 }
        ],
        edges: [
          { source: "CRM_Leads_Data", target: "Sales_Performance_Insights" },
          { source: "Sales_Transactions_2025", target: "Sales_Performance_Insights" },
          { source: "Sales_Performance_Insights", target: "Dashboard_PowerBI" }
        ]
      }
    },
    {
      dataProductId: "DP-002",
      dataProductName: "Revenue Forecasting Model",
      importance: "High",
      shortDescription: "Predictive analytics for quarterly revenue projections",
      curationDetails: {
        description: "AI-powered revenue forecasting using historical sales data and market indicators.",
        businessValue: "Enables accurate financial planning and resource allocation decisions.",
        curator: "AI Data Product Agent",
        lastCuratedOn: "2025-11-04",
        status: "Auto-curated and validated"
      },
      datasets: [
        {
          datasetId: "DS-103",
          datasetName: "Historical_Revenue_2020_2025",
          records: 245678,
          owner: "FinanceDept",
          lastRefreshed: "2025-11-05"
        }
      ],
      lineage: {
        nodes: [
          { id: "Historical_Revenue_2020_2025", type: "Source", x: 100, y: 200 },
          { id: "Revenue_Forecasting_Model", type: "DataProduct", x: 400, y: 200 },
          { id: "Finance_Dashboard", type: "Consumer", x: 700, y: 200 }
        ],
        edges: [
          { source: "Historical_Revenue_2020_2025", target: "Revenue_Forecasting_Model" },
          { source: "Revenue_Forecasting_Model", target: "Finance_Dashboard" }
        ]
      }
    }
  ],
  "Marketing Framework": [
    {
      dataProductId: "DP-003",
      dataProductName: "Customer Engagement Analytics",
      importance: "Medium",
      shortDescription: "Comprehensive view of customer interactions across channels",
      curationDetails: {
        description: "Aggregates customer touchpoints from email, social media, and web to provide engagement insights.",
        businessValue: "Optimizes marketing campaigns and improves customer retention strategies.",
        curator: "AI Data Product Agent",
        lastCuratedOn: "2025-11-03",
        status: "Auto-curated and validated"
      },
      datasets: [
        {
          datasetId: "DS-201",
          datasetName: "Email_Campaign_Metrics",
          records: 456789,
          owner: "MarketingDept",
          lastRefreshed: "2025-11-02"
        },
        {
          datasetId: "DS-202",
          datasetName: "Social_Media_Analytics",
          records: 987654,
          owner: "MarketingDept",
          lastRefreshed: "2025-11-03"
        }
      ],
      lineage: {
        nodes: [
          { id: "Email_Campaign_Metrics", type: "Source", x: 100, y: 100 },
          { id: "Social_Media_Analytics", type: "Source", x: 100, y: 300 },
          { id: "Customer_Engagement_Analytics", type: "DataProduct", x: 400, y: 200 },
          { id: "Marketing_Dashboard", type: "Consumer", x: 700, y: 200 }
        ],
        edges: [
          { source: "Email_Campaign_Metrics", target: "Customer_Engagement_Analytics" },
          { source: "Social_Media_Analytics", target: "Customer_Engagement_Analytics" },
          { source: "Customer_Engagement_Analytics", target: "Marketing_Dashboard" }
        ]
      }
    }
  ],
  "Sales Framework": [
    {
      dataProductId: "DP-004",
      dataProductName: "Lead Conversion Pipeline",
      importance: "High",
      shortDescription: "End-to-end tracking of lead conversion from prospect to customer",
      curationDetails: {
        description: "Combines CRM, sales activity, and conversion data to track the complete customer journey.",
        businessValue: "Identifies bottlenecks in the sales process and improves conversion rates.",
        curator: "AI Data Product Agent",
        lastCuratedOn: "2025-11-05",
        status: "Auto-curated and validated"
      },
      datasets: [
        {
          datasetId: "DS-301",
          datasetName: "CRM_Pipeline_Data",
          records: 345678,
          owner: "SalesDept",
          lastRefreshed: "2025-11-05"
        },
        {
          datasetId: "DS-302",
          datasetName: "Sales_Activities_Log",
          records: 567890,
          owner: "SalesDept",
          lastRefreshed: "2025-11-04"
        }
      ],
      lineage: {
        nodes: [
          { id: "CRM_Pipeline_Data", type: "Source", x: 100, y: 100 },
          { id: "Sales_Activities_Log", type: "Source", x: 100, y: 300 },
          { id: "Lead_Conversion_Pipeline", type: "DataProduct", x: 400, y: 200 },
          { id: "Sales_Analytics_Dashboard", type: "Consumer", x: 700, y: 200 }
        ],
        edges: [
          { source: "CRM_Pipeline_Data", target: "Lead_Conversion_Pipeline" },
          { source: "Sales_Activities_Log", target: "Lead_Conversion_Pipeline" },
          { source: "Lead_Conversion_Pipeline", target: "Sales_Analytics_Dashboard" }
        ]
      }
    },
    {
      dataProductId: "DP-005",
      dataProductName: "Territory Performance Index",
      importance: "Medium",
      shortDescription: "Regional sales performance comparison and trend analysis",
      curationDetails: {
        description: "Provides territory-wise performance metrics and competitive analysis.",
        businessValue: "Enables data-driven territory planning and resource allocation.",
        curator: "AI Data Product Agent",
        lastCuratedOn: "2025-11-02",
        status: "Auto-curated and validated"
      },
      datasets: [
        {
          datasetId: "DS-303",
          datasetName: "Regional_Sales_Data",
          records: 234567,
          owner: "SalesDept",
          lastRefreshed: "2025-11-01"
        }
      ],
      lineage: {
        nodes: [
          { id: "Regional_Sales_Data", type: "Source", x: 100, y: 200 },
          { id: "Territory_Performance_Index", type: "DataProduct", x: 400, y: 200 },
          { id: "Territory_Planning_Tool", type: "Consumer", x: 700, y: 200 }
        ],
        edges: [
          { source: "Regional_Sales_Data", target: "Territory_Performance_Index" },
          { source: "Territory_Performance_Index", target: "Territory_Planning_Tool" }
        ]
      }
    }
  ]
};
