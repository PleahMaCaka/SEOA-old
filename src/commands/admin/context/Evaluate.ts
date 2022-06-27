import { ContextMenuInteraction, MessageEmbed } from "discord.js"
import { ContextMenu, Discord, Guild, Permission } from "discordx"
import * as ts from "typescript"
import { inspect } from "util"
import { EvalType } from "../../../typescript/Evaluate"
import { Logger } from "../../../utils/Logger"

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
		let message: string
		message = await interaction.channel!.messages.fetch(interaction.targetId).then(msg => message = msg.content)

		// remove backticks
		if (message.startsWith("```") && message.endsWith("```")) {
			// code can contain backticks
			for (let i = 0; i < 2; i++)
				message = message.replace("```", "")
					.split("").reverse().join("")
		} else return await interaction.editReply("not a codeblock")


		//////////////////////////////
		// CHECK LANG
		////////////////////
		let evalType: EvalType | undefined

		const JSKeywords = ["javascript", "js", "JAVASCRIPT", "JS", "JavaScript"]
		const TSKeywords = ["typescript", "ts", "TYPESCRIPT", "TS", "TypeScript"]
		const keywords: Array<string> = [...JSKeywords, ...TSKeywords]

		let lang: string | undefined
		for await (const keyword of keywords) {
			if (message.startsWith(keyword)) lang = keyword
			if (JSKeywords.includes(keyword)) evalType = "JS"
			else if (TSKeywords.includes(keyword)) evalType = "TS"
		}

		if (lang) message = message.replace(lang + "\n", "")
		if (!evalType || !lang) return await interaction.editReply("not a valid language")

		//////////////////////////////
		// CODE EXECUTE
		////////////////////
		const evalEmbed = new MessageEmbed()
			.setTitle("Evaluate")
			.setColor("#bc92ff")

		let result: any

		try {
			if (!evalType) return await interaction.editReply("something wrong!")
			switch (evalType) {
				case "JS":
					result = await eval(message)
					break
				case "TS":
					const compile = ts.transpile(message)
					result = await eval(compile)
					break
			}
			inspect(result, { depth: 0 })
			evalEmbed.addField(":inbox_tray: **INPUT**", `\`\`\`${evalType}\n${message}\`\`\``, false)
		} catch (e) {
			evalEmbed.addField(":warning: **ERROR**", `\`\`\`${evalType}\n${e}\`\`\``, false)
			Logger.log("ERROR", `Cannot evaluate ${evalType} code, check the console`)
			console.log(e)
		}

		//////////////////////////////
		// SEND RESULT
		////////////////////
		// Logging
		Logger.log("DEBUG",
			`EVALUATE LOG\n` +
			`< ${evalType} EVALUATE START >\n` +
			`▼  INPUT CODE  ▼\n` +
			`${message}\n\n` +
			`▼ RETURN VALUE ▼\n` +
			`${result}\n\n` +
			`<   EVALUATE  END   >`
		)

		// convert to empty content to string
		if (result === undefined) result = "undefined"
		if (result === null) result = "null"
		else result = result as unknown as string

		// HIDE **IMPORTANT** INFORMATION //
		String(result)
			.replaceAll(process.env.TOKEN as string, "[!!!TOKEN!!!]")

		evalEmbed.addField(":outbox_tray: **OUTPUT**", `${String(result)}`, false)

		await interaction.editReply({ embeds: [evalEmbed] })
		// TODO save to db and upload to hastebin
		// TODO original code message hyperlink
		// TODO allow `js> stuff()`
	}

}