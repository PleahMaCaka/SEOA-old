import { ArgsOf, Client, Discord, Once } from "discordx"
import { connectMongoDB } from "../mongo/Mongo"
import { Logger } from "../utils/Logger"

@Discord()
class Ready {

	// noinspection JSUnusedLocalSymbols
	@Once("ready")
	private async ready(
		[ready]: ArgsOf<"ready">,
		client: Client
	) {
		await client.initApplicationCommands({
			guild: { log: true },
			global: { log: true },
		})
		await client.initApplicationPermissions()

		Logger.log("INFO", `${client.user!.username} is ready!`)
		Logger.log("DEBUG", "!DEBUG MODE IS ENABLED!")

		await connectMongoDB()
	}

}