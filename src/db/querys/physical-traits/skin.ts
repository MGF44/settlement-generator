import { ISkin } from "../../interfaces/npc/skin"
import { Skin } from "../../schemas/npc/skin"

const getSkinColors = async (): Promise<ISkin[]> => {
    return await Skin.find({})
}

export { getSkinColors }