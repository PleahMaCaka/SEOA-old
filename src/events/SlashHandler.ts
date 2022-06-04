import { ArgsOf, Client, Discord, On } from "discordx";
import { Logger } from "../utils/Logger";

@Discord()
class SlashHandler {

	@On("interactionCreate")
	private async slashInteraction(
		[interaction]: ArgsOf<"interactionCreate">,
		client: Client
	) {
		if (!interaction.isCommand()) return

		try {
			await client.executeInteraction(interaction)
		} catch (e) {
			Logger.log("ERROR", `Cannot execute -> ${interaction.commandName} <- check the command.`)
			console.log(e)
		}
	}

}