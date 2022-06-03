import { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";

@Discord()
export abstract class About {

	@Slash("about", { description: "Information about the bot" })
	private async aboutSlash(
		interaction: CommandInteraction,
	): Promise<void> {
		await interaction.reply({ content: "awesome!" })
	}

}