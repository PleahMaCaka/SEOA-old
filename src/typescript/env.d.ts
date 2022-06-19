declare global {
	namespace NodeJS {
		interface ProcessEnv {
			TOKEN: string | undefined
			ADMIN: string | undefined
			ADMIN_GUILD: string | undefined
			DEBUG: string | undefined
			DB_URI: string | undefined
		}
	}
}

export {}