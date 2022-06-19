import * as mongoose from "mongoose";

export const hastebinData = new mongoose.Schema({
	key: String,
	description: { type: String, required: false },
	timestamp: Date,
	guild: {
		required: false,
		guildId: { type: String, required: false },
		channelId: { type: String, required: false },
		messageId: { type: String, required: false }
	}
})