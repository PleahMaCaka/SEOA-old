import axios from "axios"
import { ContextMenuInteraction, MessageActionRow, MessageButton, MessageEmbed } from "discord.js"
import { ContextMenu, Discord } from "discordx"
import { user } from "../../mongo/models/UserData";
import { checkRegister } from "../../mongo/Mongo"
import { IHastebinData } from "../../typescript/mongo/user/data/IHastebinData"

@Discord()
export abstract class Hastebin {

	@ContextMenu("MESSAGE", "≫ HASTEBIN ≪")
	private async userHandler(interaction: ContextMenuInteraction) {
		await interaction.deferReply()

		const message = await interaction.channel!!.messages.fetch(interaction.targetId)

		//////////////////////////////
		// NO CONTENT
		////////////////////
		if (message.content === undefined || message.content.length === 0) {
			const tooShortEmbed = new MessageEmbed()
				.setTitle(`:warning: 업로드 실패!`)
				.setDescription("임베드, 이미지, 파일(준비중)등은 업로드가 불가합니다.")
				.setColor("RED")
			return await interaction.editReply({ embeds: [tooShortEmbed] })
		}

		const res = await axios({
			method: "POST",
			url: "https://www.toptal.com/developers/hastebin/documents",
			data: message.content
		})

		//////////////////////////////
		// UPLOAD FAILED
		////////////////////
		if (res.status !== 200) {
			const errorEmbed = new MessageEmbed()
				.setTitle(":warning: 업로드 실패!")
				.setDescription(`Code: ${res.status}, 다시 시도 후 실패 시 관리자에게 문의하세요. \`/문의\``)
				.setColor("RED")
			return await interaction.editReply({ embeds: [errorEmbed] })
		}

		//////////////////////////////
		// UPLOAD SUCCESS
		////////////////////
		if (res.status === 200) {
			const { guildId, channelId, targetId } = interaction // can't be using `user`, already using in mongo
			const successEmbed = new MessageEmbed()
				.setTitle(":white_check_mark: 업로드 성공!")
				.setDescription(`
					아래 버튼을 눌러 확인하세요.
					<@${interaction.user.id}> » [저장된 메세지](https://discord.com/channels/${guildId}/${channelId}/${targetId})
				`)
				.setColor("GREEN")

			const goHaste = new MessageButton()
				.setURL(`https://www.toptal.com/developers/hastebin/${res.data.key}`)
				.setStyle("LINK")
				.setLabel("확인하기")

			const goRawHaste = new MessageButton()
				.setURL(`https://www.toptal.com/developers/hastebin/raw/${res.data.key}`)
				.setStyle("LINK")
				.setLabel("원시 데이터")

			const row = new MessageActionRow()
				.addComponents(goHaste, goRawHaste)


			//////////////////////////////
			// SAVE DATA
			////////////////////
			const data: IHastebinData = {
				key: res.data.key,
				timestamp: Date.now(),
				guild: interaction.inGuild() ? {
					guildId: interaction.guildId,
					channelId: interaction.channelId,
					messageId: interaction.targetId
				} : undefined
			}

			await checkRegister(interaction).then(async () => {
				const oldData = await user.findOne({ id: interaction.user.id })
				await user.updateOne(
					{ id: interaction.user.id },
					{ hastebin: [data, ...oldData!.hastebin] }
				)
			})

			return await interaction.editReply({ embeds: [successEmbed], components: [row] })
		}
	}
}