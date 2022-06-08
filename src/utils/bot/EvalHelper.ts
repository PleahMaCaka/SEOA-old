import { Logger } from "../Logger";
import * as ts from "typescript";

/**
 * ref: https://github.com/Microsoft/TypeScript-wiki/blob/main/Using-the-Compiler-API.md#a-simple-transform-function
 */

const error = "A problem occurred while running the code. Check the log."

export const JSEvalKeywords = ["javascript", "js", "JAVASCRIPT", "JavaScript"]
export const TSEvalKeywords = ["typescript", "ts", "TYPESCRIPT", "TypeScript"]
export const evalTypeKeywords = [...JSEvalKeywords, ...TSEvalKeywords]

/**
 * @param code - evaluate javascript code
 */
export async function asyncEval(code: string): Promise<any> {
	try {
		const result = await eval(code)
		Logger.log("DEBUG",
			`EVALUATE LOG\n` +
			`< JS EVALUATE START >\n` +
			`    ▼  INPUT CODE  ▼\n` +
			`${code}\n\n` +
			`    ▼ RETURN VALUE ▼\n` +
			`${result}\n\n` +
			`< EVALUATE END >`
		)
		return result
	} catch (e) {
		Logger.log("ERROR", "Cannot evaluate javascript code, check the log")
		console.log(e)
		return error
	}
}

/**
 * @description evaluate typescript code
 */
export async function tsAsyncEval(code: string): Promise<any> {
	try {
		// compile typescript code
		const trans = ts.transpile(code)
		// eval compiled code
		const result = await asyncEval(trans)
		Logger.log("DEBUG",
			`EVALUATE LOG\n` +
			`< TS EVALUATE START >\n` +
			`    ▼  INPUT CODE  ▼\n` +
			`${code}\n\n` +
			`    ▼ RETURN VALUE ▼\n` +
			`${result}\n\n` +
			`< EVALUATE END >`
		)
		return result
	} catch (e) {
		Logger.log("ERROR", "Cannot evaluate typescript code, check the log")
		console.log(e)
		return error
	}
}