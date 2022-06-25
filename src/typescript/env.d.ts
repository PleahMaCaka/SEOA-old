declare global {
	namespace NodeJS {
		interface ProcessEnv {
			// Dev & Admin
			TOKEN: string | undefined
			ADMIN: string | undefined
			ADMIN_GUILD: string | undefined
			DEBUG: string | undefined
			// MongoDB
			DB_URI: string | undefined
			DE_NAME: string | undefined
			DB_USER: string | undefined
			DB_PASS: string | undefined
		}
	}
}

export {}