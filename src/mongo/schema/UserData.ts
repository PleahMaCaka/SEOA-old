import * as mongoose from "mongoose"
import { IUserSchema } from "../../typescript/mongo/user/IUserSchema"
import { hastebinData } from "./data/HastebinData"

export const userSchema = new mongoose.Schema({
	id: String,
	hastebin: [hastebinData]
}, {
	versionKey: false
})

export const user = mongoose.model<IUserSchema>("user", userSchema)