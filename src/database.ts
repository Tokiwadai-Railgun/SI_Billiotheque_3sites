import { Database } from "./types/types";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

const dialect = new PostgresDialect({
		pool: new Pool({
				database: 'si_bibliotheque_3sites',
				host: 'localhost',
				user: 'remote',
				port: 5432,
				max: 10,
				password: "remote"
		})
});

export const db = new Kysely<Database>({
		dialect
})
