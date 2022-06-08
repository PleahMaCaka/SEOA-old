import { Client } from "discordx";
import { ALL_INTENTS } from "./utils/bot/AllIntents";
import { importx } from "@discordx/importer";
import { Logger } from "./utils/Logger";
import "dotenv/config"

const client = new Client({
	intents: ALL_INTENTS,
	partials: ["CHANNEL", "MESSAGE"],
	botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)]
})

async function start() {
	await importx(__dirname + "/{events,commands}/**/*.{ts,js}")

	if (!process.env.TOKEN)
		return Logger.log("ERROR", "Stopped working because TOKEN didn't exist in *.env* file. The bot is not running.")
	else await client.login(process.env.TOKEN)

	Logger.log("DEBUG", "Test")
}

start().then(() => {
	Logger.log("INFO", "Starting Discord Bot...")
})
