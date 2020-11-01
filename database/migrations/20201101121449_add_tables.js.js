exports.up = async (knex) => {
	await knex.raw('create extension if not exists "uuid-ossp"')
	//example code
	// await knex.schema.createTable('example', (table) => {
	// 	table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
	// 	table.string('firstName').notNullable()
	// })
};

exports.down = async (knex) => {
	//example code
	// await knex.schema.dropTable('example')
};
