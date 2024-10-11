import { IHair } from "../../interfaces/eyes_hair"
import { Hair } from "../../schemas/hair"

const getHairColors = async (): Promise<IHair[]> => {
    return await Hair.find({})
}

export { getHairColors }