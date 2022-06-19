import { connect } from "mongoose";
import { Logger } from "../utils/Logger";

export async function connectMongoDB() {
	await connect(process.env.DB_URI ? process.env.DB_URI : "mongodb://localhost:27017", (error) => {
		if (error) return console.error(error)
		else Logger.log("INFO", "Connecting MongoDB...")
	})
}