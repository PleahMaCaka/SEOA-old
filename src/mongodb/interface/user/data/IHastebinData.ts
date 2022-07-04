export interface IHastebinData {
	key: string
	description?: string
	timestamp: number
	guild?: {
		guildId: number | string
		channelId: number | string
		messageId: number | string
	}
}