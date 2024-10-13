import IName from "../../interfaces/npc/name"
import { ISpecies } from "../../interfaces/npc/species"
import { Name } from "../../schemas/npc/name"


const getSpeciesNames = async (species: ISpecies, gender?: string): Promise<IName[]> => {
    return await Name.find({ species: (species as any)._id, gender })
}

export { getSpeciesNames }