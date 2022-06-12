import { ButtonInteraction, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { ButtonComponent, Client, Discord, Slash, SlashGroup } from "discordx";
import { MessageButtonStyles } from "discord.js/typings/enums";


@Discord()
@SlashGroup({ name: "봇", description: "봇에 대해 알아보세요!" })
@SlashGroup("봇")
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
			const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setLabel("more information")
						.setStyle(MessageButtonStyles.SUCCESS)
						.setCustomId("status-admin-info")
				)

			return await interaction.followUp({ ephemeral: true, components: [row] })
		}
	}

	@ButtonComponent("status-admin-info")
	private async adminStatusBtn(interaction: ButtonInteraction) {
		const moreInfoEmbed = new MessageEmbed()
			.setTitle("Admin Information")
			.setColor("GREEN")

		const memory: NodeJS.MemoryUsage = process.memoryUsage()

		for (let key of Object.keys(memory)) {
			moreInfoEmbed.addField(
				key,
				`${(memory[key as keyof typeof memory] / 1024 / 1024 * 100).toFixed()} MB`,
				true
			)
		}

		await interaction.reply({ ephemeral: true, embeds: [moreInfoEmbed] })
	}

}