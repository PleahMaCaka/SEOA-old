declare global {
	namespace NodeJS {
		interface ProcessEnv {
			TOKEN: string | undefined
			ADMIN: string | undefined
			ADMIN_GUILD: string | undefined
			DEBUG: string | boolean | undefined
		}
	}
}

export {}