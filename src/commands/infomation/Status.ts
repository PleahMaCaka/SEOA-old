import { ButtonInteraction, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { ButtonComponent, Client, Discord, Slash } from "discordx";
import { MessageButtonStyles } from "discord.js/typings/enums";


@Discord()
export abstract class Status {

	@Slash("상태", { description: "봇의 상태를 확인하세요!" })
	private async statusSlash(
		interaction: CommandInteraction,
		client: Client
	) {
		const embed = new MessageEmbed()
			.setTitle("상태(Status)")
			.addField("Bot Latency", `${Date.now() - interaction.createdTimestamp}ms`, true)
			.addField("API Latency", `${Math.round(client.ws.ping)}ms`, true)
			.setColor("GREEN")

		await interaction.reply({ embeds: [embed] })

		if (interaction.user.id === process.env.ADMIN) {
			const adminBtn = new MessageButton()
				.setLabel("more information")
				.setStyle(MessageButtonStyles.SUCCESS)
				.setCustomId("status-admin-info")

			const row = new MessageActionRow()
				.addComponents(adminBtn)

			return await interaction.reply({ephemeral: true, components: [row] })
		}
	}

	@ButtonComponent("status-admin-info")
	private async adminStatusBtn(interaction: ButtonInteraction) {
		const adminEmbed = new MessageEmbed()
			.setTitle("Admin Information")

		for await (const [key, value] of Object.entries(process.memoryUsage)) {
			adminEmbed.addField(key, value)
		}

		await interaction.followUp({ embeds: [adminEmbed] })
	}
}