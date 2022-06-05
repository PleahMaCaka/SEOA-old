import { ArgsOf, Client, Discord, On } from "discordx";
import { Logger } from "../utils/Logger";

@Discord()
class GuildCreate {

	@On("guildCreate")
	private async joinToInitCommands(
		[guild]: ArgsOf<"guildCreate">,
		client: Client
	) {
		Logger.log("DEBUG", `The bot has been join to Guild ${guild.name}(${guild.id}) -> deploy commands`)
		try {
			const commands = client.applicationCommands.map(cmd => cmd)
			await client.initGuildApplicationCommands(guild.id, commands)
			await client.initGuildApplicationPermissions(guild.id, commands)
		} catch (e) {
			Logger.log("DEBUG",
				"The bot has joined a new guild.\n" +
				"But there was a problem while deploying commands.")
			console.log(e)
		}
	}

}