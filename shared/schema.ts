import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for basic authentication
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Leads/contacts table for form submissions
export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  service: text("service").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
  status: text("status").default("new"), // new, contacted, converted, closed
});

// Virtual tours table for uploaded 360° images
export const virtualTours = pgTable("virtual_tours", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  filename: text("filename").notNull(),
  filePath: text("file_path").notNull(),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

// Yandex Maps entries table
export const yandexMapsEntries = pgTable("yandex_maps_entries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationName: text("organization_name").notNull(),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  workingHours: text("working_hours"),
  category: text("category").notNull(),
  description: text("description"),
  jsonData: text("json_data").notNull(), // Complete JSON export
  createdAt: timestamp("created_at").defaultNow(),
});

// Generated texts table
export const generatedTexts = pgTable("generated_texts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  topic: text("topic").notNull(),
  audience: text("audience").notNull(),
  length: text("length").notNull(),
  generatedText: text("generated_text").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertLeadSchema = createInsertSchema(leads).pick({
  name: true,
  phone: true,
  email: true,
  service: true,
  message: true,
});

export const insertVirtualTourSchema = createInsertSchema(virtualTours).pick({
  name: true,
  filename: true,
  filePath: true,
});

export const insertYandexMapsEntrySchema = createInsertSchema(yandexMapsEntries).pick({
  organizationName: true,
  address: true,
  phone: true,
  workingHours: true,
  category: true,
  description: true,
  jsonData: true,
});

export const insertGeneratedTextSchema = createInsertSchema(generatedTexts).pick({
  topic: true,
  audience: true,
  length: true,
  generatedText: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

export type InsertVirtualTour = z.infer<typeof insertVirtualTourSchema>;
export type VirtualTour = typeof virtualTours.$inferSelect;

export type InsertYandexMapsEntry = z.infer<typeof insertYandexMapsEntrySchema>;
export type YandexMapsEntry = typeof yandexMapsEntries.$inferSelect;

export type InsertGeneratedText = z.infer<typeof insertGeneratedTextSchema>;
export type GeneratedText = typeof generatedTexts.$inferSelect;
