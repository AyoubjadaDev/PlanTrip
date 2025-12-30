import { pgTable, foreignKey, uuid, text, integer, unique, timestamp, json, boolean } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"




export const accounts = pgTable("accounts", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	type: text("type").notNull(),
	provider: text("provider").notNull(),
	providerAccountId: text("provider_account_id").notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text("scope"),
	idToken: text("id_token"),
	sessionState: text("session_state"),
},
(table) => {
	return {
		accountsUserIdUsersIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "accounts_user_id_users_id_fk"
		}).onDelete("cascade"),
	}
});

export const sessions = pgTable("sessions", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	sessionToken: text("session_token").notNull(),
	userId: uuid("user_id").notNull(),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		sessionsUserIdUsersIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "sessions_user_id_users_id_fk"
		}).onDelete("cascade"),
		sessionsSessionTokenUnique: unique("sessions_session_token_unique").on(table.sessionToken),
	}
});

export const trips = pgTable("trips", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id"),
	destination: text("destination").notNull(),
	startDate: timestamp("start_date", { mode: 'string' }).notNull(),
	endDate: timestamp("end_date", { mode: 'string' }).notNull(),
	budget: text("budget").notNull(),
	travelType: text("travel_type").notNull(),
	activities: text("activities").array().notNull(),
	language: text("language").default('en').notNull(),
	itinerary: json("itinerary").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	ipAddress: text("ip_address"),
},
(table) => {
	return {
		tripsUserIdUsersIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "trips_user_id_users_id_fk"
		}).onDelete("cascade"),
	}
});

export const usageTracking = pgTable("usage_tracking", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	ipAddress: text("ip_address").notNull(),
	tripsGenerated: integer("trips_generated").default(0).notNull(),
	lastUsedAt: timestamp("last_used_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		usageTrackingIpAddressUnique: unique("usage_tracking_ip_address_unique").on(table.ipAddress),
	}
});

export const users = pgTable("users", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	email: text("email").notNull(),
	password: text("password"),
	name: text("name"),
	emailVerified: timestamp("email_verified", { mode: 'string' }),
	image: text("image"),
	isAdmin: boolean("is_admin").default(false).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		usersEmailUnique: unique("users_email_unique").on(table.email),
	}
});

export const verificationTokens = pgTable("verification_tokens", {
	identifier: text("identifier").notNull(),
	token: text("token").notNull(),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		verificationTokensTokenUnique: unique("verification_tokens_token_unique").on(table.token),
	}
});

export const passwordResetTokens = pgTable("password_reset_tokens", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	token: text("token").notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		passwordResetTokensUserIdUsersIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "password_reset_tokens_user_id_users_id_fk"
		}).onDelete("cascade"),
		passwordResetTokensTokenUnique: unique("password_reset_tokens_token_unique").on(table.token),
	}
});

export const subscribers = pgTable("subscribers", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	email: text("email").notNull(),
	subscribedAt: timestamp("subscribed_at", { mode: 'string' }).defaultNow().notNull(),
	isActive: boolean("is_active").default(true).notNull(),
},
(table) => {
	return {
		subscribersEmailUnique: unique("subscribers_email_unique").on(table.email),
	}
});

export const groqApiKeys = pgTable("groq_api_keys", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	key: text("key").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	isActive: boolean("is_active").default(true).notNull(),
	usageCount: integer("usage_count").default(0).notNull(),
},
(table) => {
	return {
		groqApiKeysKeyUnique: unique("groq_api_keys_key_unique").on(table.key),
	}
});

export const analyticsEvents = pgTable("analytics_events", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id"),
	eventType: text("event_type").notNull(),
	eventData: json("event_data"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		analyticsEventsUserIdUsersIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "analytics_events_user_id_users_id_fk"
		}).onDelete("set null"),
	}
});

export const blogPosts = pgTable("blog_posts", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	slug: text("slug").notNull(),
	title: text("title").notNull(),
	description: text("description"),
	content: text("content").notNull(),
	image: text("image"),
	category: text("category").notNull(),
	status: text("status").default('draft').notNull(),
	author: text("author").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	publishedAt: timestamp("published_at", { mode: 'string' }),
	viewCount: integer("view_count").default(0).notNull(),
},
(table) => {
	return {
		blogPostsSlugUnique: unique("blog_posts_slug_unique").on(table.slug),
	}
});

export const contactMessages = pgTable("contact_messages", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: text("name").notNull(),
	email: text("email").notNull(),
	subject: text("subject").notNull(),
	message: text("message").notNull(),
	isRead: boolean("is_read").default(false).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});