import { ContextMenuInteraction, Message, MessageEmbed } from "discord.js";
import { ContextMenu, Discord, Guild, Permission } from "discordx";
import { asyncEval, evalTypeKeywords, JSEvalKeywords, tsAsyncEval, TSEvalKeywords } from "../../../utils/bot/EvalHelper";
import { EvalType } from "../../../typescript/type/EvalType";

@Discord()
@Permission(false)
@Permission({ id: process.env.ADMIN!, type: "USER", permission: true })
@Guild(process.env.ADMIN_GUILD!)
export abstract class ExampleContext {

	@ContextMenu("MESSAGE", "≫ :: EVALUATE :: ≪")
	private async evaluateContext(interaction: ContextMenuInteraction) {
		await interaction.deferReply({ ephemeral: (process.env.ADMIN_GUILD !== interaction.guildId) })

		//////////////////////////////
		// Convert Message
		////////////////////
		let message: string | Message = await interaction.channel!!.messages.fetch(interaction.targetId)
		message = message.content

		// remove backtick
		if (message.startsWith("```") && message.endsWith("```")) {
			// code can contain backtick
			for (let i = 0; i < 2; i++) {
				message = message.replace("```", "")
				message = message.split("").reverse().join("")
			}
		} else return await interaction.editReply("코드 블럭이 아닙니다.")

		//////////////////////////////
		// CHECK LANG
		////////////////////
		let evalType: EvalType | undefined = undefined

		evalTypeKeywords.forEach(word => {
			message = String(message)
			if (message.startsWith(word)) {
				message = message.replace(`${word}\n`, "")
				if (JSEvalKeywords.includes(word)) evalType = "JS"
				else if (TSEvalKeywords.includes(word)) evalType = "TS"
			}
		})

		if (message === undefined || evalType === undefined)
			return await interaction.editReply("JS/TS 코드가 아닙니다.")

		//////////////////////////////
		// CODE EXECUTE
		////////////////////
		const evalEmbed = new MessageEmbed()
			.setTitle("Evaluate")
			.setColor("#bc92ff")

		let evaled: any

		switch (evalType) {
			case "JS":
				evaled = await asyncEval(message)
				evalEmbed.addField(":inbox_tray: **INPUT**", `\`\`\`js\n${message}\`\`\``, false)
				break
			case "TS":
				evaled = await tsAsyncEval(message)
				evalEmbed.addField(":inbox_tray: **INPUT**", `\`\`\`ts\n${message}\`\`\``, false)
				break
		}

		//////////////////////////////
		// SEND RESULT
		////////////////////

		// convert to empty content to string
		if (evaled === undefined) evaled = "undefined"
		if (evaled === null) evaled = "null"
		else evaled = evaled as unknown as string

		// HIDE **IMPORTANT** INFORMATION //
		String(evaled)
			.replaceAll(process.env.TOKEN!, "[!!!TOKEN!!!]")
		// HIDE **IMPORTANT** INFORMATION //

		evalEmbed.addField(":outbox_tray: **OUTPUT**", `${String(evaled)}`, false)

		await interaction.editReply({ embeds: [evalEmbed] });
		// TODO save to db and upload to hastebin
	}
}