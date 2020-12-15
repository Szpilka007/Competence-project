exports.up = async (knex) => {
  await knex.raw('create extension if not exists "uuid-ossp"');
  await knex.schema.createTable("traces", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    table.uuid("personId").notNull();
    table.uuid("hotspotId").notNull();
    table.timestamp("entryTime").notNull();
    table.timestamp("exitTime").notNull();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable("traces");
};