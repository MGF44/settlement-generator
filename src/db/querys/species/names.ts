import { ObjectId, Query } from "mongoose"
import IName from "../../interfaces/name"
import { ISpecies } from "../../interfaces/species"
import { Name } from "../../schemas/name"
import { Species } from "../../schemas/species"


const getSpeciesNames = async (species: ISpecies, gender?: string): Promise<IName[]> => {
    return await Name.find({ species: (species as any)._id, gender })
}

export { getSpeciesNames }