import { Interaction } from "discord.js"
import { connect } from "mongoose"
import { DEBUG } from "../start";
import { Logger } from "../utils/Logger"
import { user } from "./schema/UserData";


const DB_URI = process.env.DB_URI ? process.env.DB_URI : "mongodb://localhost:27017"
const DB_NAME = process.env.DB_NAME ? process.env.DB_NAME : "discord"
const DB_USER = process.env.DB_URI === "mongodb://localhost:27017" ? undefined : process.env.DB_USER
const DB_PASS = process.env.DB_PASS === "mongodb://localhost:27017" ? undefined : process.env.DB_PASS


export async function connectMongoDB() {
	if (DB_URI.indexOf("localhost") != -1) {
		Logger.log("WARN",
			"You have set your MongoDB URI to localhost. But it is changed to \"127.0.0.1\" and connected " +
			"because it cause problems depending on the version of Node.")
		DB_URI.replace("localhost", "127.0.0.1")
	}

	if (DB_URI != "mongodb://127.0.0.1:27017")
		if (!DB_URI || !DB_USER || !DB_PASS)
			throw new Error("You have to set your MongoDB URI, username and password in your env (or .env file)")

	if (DB_URI.indexOf("127.0.0.1") != -1 && !DEBUG)
		Logger.log("ERROR", "Connect to localhost DB in non-debug mode.")

	// local mongodb
	if (DB_URI == "mongodb://127.0.0.1:27017")
		return await connect(DB_URI, { dbName: DB_NAME ? DB_NAME : "discord" })
			.then(() => Logger.log("INFO", "Connected to localhost(127.0.0.1) MongoDB"))

	// external mongodb
	else if (DB_USER && process.env.DB_PASS) {
		await connect(DB_URI, { user: DB_USER, pass: DB_PASS, dbName: DB_NAME })
			.then(() => Logger.log("INFO", `Connected to MongoDB ${process.env.DB_URI} - [USER : ${process.env.DB_USER}]`))
	}
}

//////////////////////////////
// Handler
////////////////////

/**
 * @description registered = true | cannot find = false
 * @param info - interaction or string(interaction.user.id)
 */
export async function checkRegister(info: Interaction | string): Promise<boolean | undefined> {
	const userid = (typeof info === "string") ? info : info.user.id
	if (!await user.findOne({ id: userid })) await user.create({ id: userid })
	else return true
}