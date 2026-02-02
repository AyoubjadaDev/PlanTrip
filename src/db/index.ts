import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Define the DB type
type DrizzleDB = ReturnType<typeof drizzle<typeof schema>>;

// Make database optional - if DATABASE_URL is not set, db will be null
// This allows the app to run without database access (useful for static content)
let migrationClient: postgres.Sql | null = null;
let db: DrizzleDB | null = null;

if (process.env.DATABASE_URL) {
  const connectionString = process.env.DATABASE_URL;

  // SSL configuration for production databases (like Render)
  const sslConfig = {
    ssl: { rejectUnauthorized: false }
  };

  // For migrations
  migrationClient = postgres(connectionString, { max: 1, ...sslConfig });

  // For queries
  const queryClient = postgres(connectionString, sslConfig);
  db = drizzle(queryClient, { schema });
} else {
  console.warn('DATABASE_URL is not set - database features will be disabled');
}

export { migrationClient, db };
export type { DrizzleDB };
