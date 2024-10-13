import IRandomTrait from "../../interfaces/npc/random_trait"
import { RandomTrait } from "../../schemas/npc/random_trait"

const getRandomTraits = async (): Promise<IRandomTrait[]> => {
    return await RandomTrait.find({})
}

export { getRandomTraits }