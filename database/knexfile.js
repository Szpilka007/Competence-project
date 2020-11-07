const { parse } = require('pg-connection-string');

module.exports = {
	client: 'pg',
	connection: {
		...parse(process.env.DATABASE_URL || 'postgres://user:password@localhost:5433/db'),
		...(process.env.DATABASE_URL ? {
			ssl: {
				rejectUnauthorized: false
			}
		} : {})
	},
	migrations: {
		tableName: '_migrations',
	},
	pool: {
		min: 0,
		max: 50
	},
};