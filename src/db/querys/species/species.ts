import { ISpecies } from "../../interfaces/npc/species"
import { Species } from "../../schemas/npc/species"

const getSpecies = async (): Promise<ISpecies[]> => {
    return await Species.find({})
}

export { getSpecies }