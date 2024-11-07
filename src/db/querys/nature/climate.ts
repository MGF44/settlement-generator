import { IClimate } from "../../interfaces/land/climate"
import { Climate } from "../../schemas/land/climate"

const getClimates = async (): Promise<IClimate[]> => {
    return await Climate.find({}).populate('subTypes')
}

export { getClimates }