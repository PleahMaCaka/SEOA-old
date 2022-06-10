import { CommandInteraction, MessageEmbed } from "discord.js";
import { Client, Discord, Slash } from "discordx";
import { performance } from "perf_hooks";


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

		// TODO memory usage
		await interaction.reply({ embeds: [embed] })
	}
}