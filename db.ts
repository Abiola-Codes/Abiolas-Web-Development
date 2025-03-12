import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Configure WebSocket for Neon database
neonConfig.webSocketConstructor = ws;

// Allow for different database configurations
const getDatabaseUrl = () => {
  // Use environment variable if available (production)
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }
  // Fallback for development (you'll need to set this up in your local env)
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
};

export const pool = new Pool({ connectionString: getDatabaseUrl() });
export const db = drizzle(pool, { schema });