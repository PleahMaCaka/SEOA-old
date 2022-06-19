import { IHastebinData } from "./data/IHastebinData"

export interface IUserSchema {
	id: String
	hastebin: [IHastebinData]
}