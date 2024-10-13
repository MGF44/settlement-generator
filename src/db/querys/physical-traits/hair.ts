import { IHair } from "../../interfaces/npc/eyes_hair"
import { Hair } from "../../schemas/npc/hair"

const getHairColors = async (): Promise<IHair[]> => {
    return await Hair.find({})
}

export { getHairColors }