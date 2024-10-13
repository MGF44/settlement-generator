import { IEyes } from "../../interfaces/npc/eyes_hair"
import { Eyes } from "../../schemas/npc/eyes"

const getEyeColors = async (): Promise<IEyes[]> => {
    return await Eyes.find({})
}

export { getEyeColors }