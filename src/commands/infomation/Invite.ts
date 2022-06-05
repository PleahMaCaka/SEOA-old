import { CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { Client, Discord, Slash } from "discordx";
import { MessageButtonStyles } from "discord.js/typings/enums";

@Discord()
export abstract class Invite {

	@Slash("초대", { description: "초대 링크를 확인하세요!", })
	private async inviteSlash(
		interaction: CommandInteraction,
		client: Client
	) {
		//////////////////////////////
		// EMBED
		////////////////////
		const invite = `https://discord.com/api/oauth2/authorize?client_id=${client.user!.id}&permissions=8&scope=bot%20applications.commands`

		const embed = new MessageEmbed()
			.setTitle(":love_letter: 초대하기")
			.setDescription(`아래의 버튼 또는 [여기](${invite})를 눌러 초대하세요!`)
			.setColor("GREEN")

		//////////////////////////////
		// BUTTON
		////////////////////
		const inviteBtn = new MessageButton()
			.setURL(invite)
			.setStyle(MessageButtonStyles.LINK)
			.setLabel("초대하기")

		const row = new MessageActionRow()
			.addComponents(inviteBtn)

		await interaction.reply({ embeds: [embed], components: [row] })
	}
}