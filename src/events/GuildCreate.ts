import { ArgsOf, Client, Discord, On } from "discordx";

@Discord()
class GuildCreate {

	@On("guildCreate")
	private async joinToInitCommands(
		[guild]: ArgsOf<"guildCreate">,
		client: Client
	) {
		const commands = client.applicationCommands.map(cmd => cmd)
		await client.initGuildApplicationCommands(guild.id, commands)
		await client.initGuildApplicationPermissions(guild.id, commands)
	}

}