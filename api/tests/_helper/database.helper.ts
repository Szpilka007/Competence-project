import { Connection } from "typeorm";

export class DatabaseHelper {
  public constructor(private readonly connection: Connection) {}

  public async truncate(...tables: string[]) {
    for (const table of tables) {
      await this.connection.query(`TRUNCATE TABLE ${table} CASCADE`);
    }
  }

  public async enableForeignKeyChecks() {
    await this.connection.query(`
      DO
      $$
      DECLARE
          row record;
      BEGIN
          FOR row IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' -- and other conditions, if needed
          LOOP
              EXECUTE 'ALTER TABLE public.' || quote_ident(row.tablename) || ' ENABLE TRIGGER ALL;';
          END LOOP;
      END;
      $$;
    `);
  }

  public async disableForeignKeyChecks() {
    await this.connection.query(`
      DO
      $$
      DECLARE
          row record;
      BEGIN
          FOR row IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' -- and other conditions, if needed
          LOOP
              EXECUTE 'ALTER TABLE public.' || quote_ident(row.tablename) || ' DISABLE TRIGGER ALL;';
          END LOOP;
      END;
      $$;
    `);
  }
}
