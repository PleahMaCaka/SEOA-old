import { CommandInteraction, MessageEmbed } from "discord.js"
import { Discord, Slash, SlashChoice, SlashGroup, SlashOption } from "discordx"
import { user } from "../mongo/models/UserData";

@Discord()
@SlashGroup({ name: "데이터" })
@SlashGroup({ name: "관리", description: "Manage your own data!", root: "데이터" })
export abstract class HastebinDAta {

	@Slash("hastebin")
	@SlashGroup("데이터")
	private async getHastebinData(
		@SlashChoice("찾기", "삭제")
		@SlashOption("type")
			type: string,
		interaction: CommandInteraction
	): Promise<void> {
		await interaction.deferReply({ ephemeral: false }) // TODO ephemeral config

		const userdata = await user.findOne({ id: interaction.user.id })

		switch (type) {
			case "찾기":
				let hastebinData = ""
				if (userdata) {
					for await (const data of userdata.hastebin) {
						const dataString = `\`${data.key}\` - ${data.description ? data.description : "설명이 없습니다."}`
						if (hastebinData) hastebinData += "\n" + dataString
						else hastebinData = dataString
					}
				} else hastebinData = "저장된 정보가 없습니다."

				const hastebinEmbed = new MessageEmbed()
					.setTitle(":notepad_spiral: Hastebin List")
					.setColor("#002B36")
					.setDescription(hastebinData ? hastebinData : "저장된 정보가 없습니다.")
				await interaction.editReply({ embeds: [hastebinEmbed] })
				return
			case "삭제":
				await interaction.deleteReply()
				return
		}
	}

}