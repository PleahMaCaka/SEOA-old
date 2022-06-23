import { Interaction } from "discord.js"
import { connect } from "mongoose"
import { Logger } from "../utils/Logger"
import { user } from "./models/UserData"

export async function connectMongoDB() {
	let uri = process.env.DB_URI ? process.env.DB_URI : "mongodb://127.0.0.1:27017"
	if (uri.endsWith("/")) uri = uri + "discord"
	else uri = uri + "/discord"

	if (uri.indexOf("localhost")) {
		Logger.log("WARN",
			"You have set your MongoDB URI to localhost. But it is changed to \"127.0.0.1\" and connected " +
			"because it cause problems depending on the version of Node.")
		uri.replace("localhost", "127.0.0.1")
	}

	await connect(uri,
		(error) => {
			if (error) {
				Logger.log("ERROR", "MongoDB connection error: " + error)
				throw new Error()
			}
			else Logger.log("INFO", "MongoDB Connected!")
		})
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