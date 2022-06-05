import { ArgsOf, Client, Discord, On } from "discordx";
import { Logger } from "../utils/Logger";

@Discord()
class InteractionHandler {

	//////////////////////////////
	// Slash Interaction
	////////////////////
	@On("interactionCreate")
	private async slashInteraction(
		[interaction]: ArgsOf<"interactionCreate">,
		client: Client
	) {
		if (!interaction.isCommand()) return

		try {
			await client.executeInteraction(interaction)
		} catch (e) {
			Logger.log("ERROR", `Cannot execute slash command -> ${interaction.commandName} <- check the command.`)
			console.log(e)
		}
	}

	//////////////////////////////
	// Context Interaction
	////////////////////
	@On("interactionCreate")
	private async interaction(
		[interaction]: ArgsOf<"interactionCreate">,
		client: Client
	): Promise<void> {
		if (!interaction.isContextMenu()) return

		try {
			await client.executeInteraction(interaction)
		} catch (e) {
			Logger.log("ERROR", `Cannot execute interaction-> ${interaction.commandName} <- check the command.`)
			console.log(e)
		}
	}

}