// db.ts
import { Client } from './deps.ts';
import { DB_CONFIG } from './config.ts';

export const client = await new Client().connect({
  hostname: DB_CONFIG.hostname,
  username: DB_CONFIG.username,
  password: DB_CONFIG.password,
  db: DB_CONFIG.db,
  port: DB_CONFIG.port,
});
