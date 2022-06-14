import { ArgsOf, Client, Discord, On } from "discordx";
import { Logger } from "../utils/Logger";

@Discord()
class InteractionHandler {

	//////////////////////////////
	// Slash Interaction
	////////////////////
	@On("interactionCreate")
	private async slashInteraction([interaction]: ArgsOf<"interactionCreate">, client: Client) {
		if (!interaction.isCommand()) return
		try {
			await client.executeInteraction(interaction)
		} catch (e) {
			Logger.log("ERROR", `Cannot execute [slash] interaction -> ${interaction.commandName} <- check the command.`)
			console.log(e)
		}
	}

	//////////////////////////////
	// Context Interaction
	////////////////////
	@On("interactionCreate")
	private async contextInteraction([interaction]: ArgsOf<"interactionCreate">, client: Client) {
		if (!interaction.isContextMenu()) return
		try {
			await client.executeInteraction(interaction)
		} catch (e) {
			Logger.log("ERROR", `Cannot execute [context] interaction-> ${interaction.commandName} <- check the command.`)
			console.log(e)
		}
	}

	//////////////////////////////
	// Button Interaction
	////////////////////
	@On("interactionCreate")
	private async buttonInteraction([interaction]: ArgsOf<"interactionCreate">, client: Client) {
		if (!interaction.isButton()) return
		try {
			await client.executeInteraction(interaction)
		} catch (e) {
			Logger.log("ERROR", `Cannot execute [button] interaction -> ${interaction.customId} <- check the command.`)
			console.log(e)
		}
	}

}