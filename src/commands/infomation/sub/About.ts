import { CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { Client, Discord, Slash, SlashGroup } from "discordx";
import { MessageButtonStyles } from "discord.js/typings/enums";
import { author, repository } from "../../../../package.json";

@Discord()
@SlashGroup({ name: "봇", description: "봇에 대해 알아보세요!" })
@SlashGroup("봇")
export abstract class About {

	@Slash("정보", { description: "봇에 대해 알아보세요!", })
	private async aboutSlash(
		interaction: CommandInteraction,
		client: Client
	) {
		//////////////////////////////
		// EMBED
		////////////////////
		const about = new MessageEmbed()
			.setColor("#bc92ff")
			.setTitle(`About ${client.user!.username}`)
			.setDescription(`다른 서버에 초대하고 싶나요? \`/초대\``)
			.setThumbnail("https://cdn.discordapp.com/attachments/982752265418977320/982752400135819274/TS_LOGO.png")
			.addField("공식 문서", "준비중 (GitBook)", true)
			.addField("지원 서버", "[접속하기](https://discord.gg/YGmyFer)", true)
			.addField("개발자", `<@${process.env.ADMIN}> (${author.name})`, false)

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