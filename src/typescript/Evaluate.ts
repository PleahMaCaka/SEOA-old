export interface Evaluate {
	code?: string,
	lang: string | undefined
}

export type EvalType = "TS" | "JS"