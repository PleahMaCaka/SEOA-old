import { CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { Client, Discord, Slash } from "discordx";
import { MessageButtonStyles } from "discord.js/typings/enums";

@Discord()
export abstract class About {

	@Slash("about", {
		nameLocalizations: {
			ko: "정보"
		},
		description: "A description of this bot!",
		descriptionLocalizations: {
			ko: "봇의 정보와 상태 그리고 초대 링크를 확인하세요!"
		}
	})
	private async aboutSlash(
		interaction: CommandInteraction,
		client: Client
	): Promise<void> {
		const { description, repository } = require("../../../package.json")

		//////////////////////////////
		// EMBED
		////////////////////

		const about = new MessageEmbed()
			.setColor("#bc92ff")
			.setTitle(`About ${client.user!.username}`)
			.setDescription(`${client.user!.username} is ${description}`)

		//////////////////////////////
		// BUTTON
		////////////////////

		const githubBtn = new MessageButton()
			.setURL(repository.url)
			.setStyle(MessageButtonStyles.LINK)
			.setLabel("Github")

		const row = new MessageActionRow()
			.addComponents(githubBtn)

		await interaction.reply({ embeds: [about], components: [row] })
	}

}