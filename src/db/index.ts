import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

// Neon HTTP client
const sql = neon(process.env.DATABASE_URL!);

// Drizzle ORM instance
export const db = drizzle(sql, { schema });

export * from './schema';
