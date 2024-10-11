import { IEyes } from "../../interfaces/eyes_hair"
import { Eyes } from "../../schemas/eyes"

const getEyeColors = async (): Promise<IEyes[]> => {
    return await Eyes.find({})
}

export { getEyeColors }