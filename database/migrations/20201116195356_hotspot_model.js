exports.up = async (knex) => {
    await knex.raw('create extension if not exists "uuid-ossp"');
    await knex.schema.createTable("hotspots", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("name").notNullable();
        table.string("description").notNullable();
        table.float("longitude").notNullable();
        table.float("latitude").notNullable();
        table.string("type").notNullable();
    });
};

exports.down = async (knex) => {
    await knex.schema.dropTable("hotspots");
  };
  