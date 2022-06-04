import { Client } from "discordx";
import { ALL_INTENTS } from "./utils/AllIntents";
import { importx } from "@discordx/importer";
import { TOKEN } from "../config.json";

const client = new Client({
	intents: ALL_INTENTS,
	partials: ["CHANNEL", "MESSAGE"],
	botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)]
})

async function start() {
	await importx(__dirname + "/{events,commands}/**/*.{ts,js}")
	await client.login(TOKEN)
}

start()