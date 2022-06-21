import * as mongoose from "mongoose"

export const hastebinData = new mongoose.Schema({
	key: { type: String, required: true },
	description: { type: String, required: false },
	timestamp: { type: Date, required: true },
	guild: {
		required: false,
		guildId: { type: String, required: false },
		channelId: { type: String, required: false },
		messageId: { type: String, required: false }
	}
}, {
	_id: false,
	versionKey: false
})