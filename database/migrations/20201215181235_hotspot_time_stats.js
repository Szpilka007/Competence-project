
exports.up = async function(knex) {
    await knex.raw('create extension if not exists "uuid-ossp"');
    await knex.schema.createTable("hotspot_time_stats", (table) => {
        table.uuid("hotspotId").primary().references("id").inTable("hotspots").notNull();
        table.bigInteger("totalTime").notNull();
    });
};

exports.down = async function(knex) {
    await knex.schema.dropTable("stayPoint_time_stats");
};
