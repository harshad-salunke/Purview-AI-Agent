import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Purview types for the frontend
export type Agent = "Information Agent" | "Data Curator Agent";

export type Priority = "High" | "Medium" | "Low";

export type AssetStatus = "Curated" | "Pending Review" | "Unassigned";

export type AssetType = "Database" | "File" | "Report" | "Table" | "Dataset";

export interface DataAsset {
  id: string;
  name: string;
  type: AssetType;
  collection: string;
  owner: string;
  status: AssetStatus;
  description: string;
  sensitivityLabel: string;
  classification: string;
  createdDate: string;
  lastModified: string;
  schema?: Array<{ field: string; type: string }>;
  lineage?: Array<{ upstream: string; downstream: string }>;
  qualityScore: string;
  tags: string[];
  domain?: string;
  steward?: string;
  sourcePath?: string;
  storageInfo?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  agent?: Agent;
  assetCards?: DataAsset[];
  curationData?: Partial<DataAsset>;
}

export interface ChatSession {
  id: string;
  agent: Agent;
  timestamp: Date;
  preview: string;
}

export interface Recommendation {
  id: string;
  title: string;
  priority: Priority;
  description: string;
  affectedAssetCount: number;
  affectedAssets: string[];
}
