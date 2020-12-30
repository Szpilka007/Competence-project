exports.up = async (knex) => {
  await knex.raw('create extension if not exists "uuid-ossp"');
  await knex.schema.createTable("hotspot_visit_stats", (table) => {
    table.uuid("hotspotId").primary().references("id").inTable("hotspots").notNull();
    table.integer("visits").notNull();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable("hotspot_visit_stats");
};