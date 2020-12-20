
exports.up = async (knex) => {
    await knex.raw('create extension if not exists "uuid-ossp"');
    await knex.schema.createTable("phoneLookUp", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("realNumber").notNullable();
      table.string("fakeNumber").notNullable();
      table.timestamp("createdAt").defaultTo(knex.fn.now());
      table.timestamp("updatedAt").defaultTo(knex.fn.now());
    });
};

exports.down = async (knex) => {
    await knex.schema.dropTable("stayPoints");
};
