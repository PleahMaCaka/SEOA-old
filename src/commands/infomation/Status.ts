import { ButtonInteraction, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { ButtonComponent, Client, Discord, Slash } from "discordx";
import { MessageButtonStyles } from "discord.js/typings/enums";
import { Memory } from "../../typescript/Memory";


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

		const memory: NodeJS.MemoryUsage = process.memoryUsage();

		for (let key in memory) {
			console.log(`Memory: ${key} ${Math.round(memory[key] / 1024 / 1024 * 100) / 100} MB`);
		}
	}
}