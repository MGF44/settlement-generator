import { ISkin } from "../../interfaces/skin"
import { Skin } from "../../schemas/skin"

const getSkinColors = async (): Promise<ISkin[]> => {
    return await Skin.find({})
}

export { getSkinColors }