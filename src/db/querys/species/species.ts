import { ISpecies } from "../../interfaces/species"
import { Species } from "../../schemas/species"

const getSpecies = async (): Promise<ISpecies[]> => {
    return await Species.find({})
}

export { getSpecies }