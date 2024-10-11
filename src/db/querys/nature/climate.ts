import { IClimate } from "../../interfaces/climate"
import { Climate } from "../../schemas/climate"

const getClimates = async (): Promise<IClimate[]> => {
    return await Climate.find({})
}

export { getClimates }