// Database schema definitions using Drizzle ORM
import { pgTable, uuid, varchar, text, timestamp, boolean } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

// Users table
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 100 }),
  avatarUrl: text("avatar_url"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow(),
  // Subscription fields
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
  subscriptionStatus: varchar("subscription_status", { length: 50 }).default("inactive"),
  subscriptionTier: varchar("subscription_tier", { length: 50 }).default("free"),
})

// Code explanations table
export const codeExplanations = pgTable("code_explanations", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  code: text("code").notNull(),
  explanation: text("explanation").notNull(),
  language: varchar("language", { length: 50 }),
  level: varchar("level", { length: 20 }),
  title: varchar("title", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  isPublic: boolean("is_public").default(false),
})

// Define relationships
export const usersRelations = relations(users, ({ many }) => ({
  explanations: many(codeExplanations),
}))

export const codeExplanationsRelations = relations(codeExplanations, ({ one }) => ({
  user: one(users, {
    fields: [codeExplanations.userId],
    references: [users.id],
  }),
}))

// Types for TypeScript
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export type CodeExplanation = typeof codeExplanations.$inferSelect
export type NewCodeExplanation = typeof codeExplanations.$inferInsert

