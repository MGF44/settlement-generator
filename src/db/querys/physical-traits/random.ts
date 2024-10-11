import IRandomTrait from "../../interfaces/random_trait"
import { RandomTrait } from "../../schemas/random_trait"

const getRandomTraits = async (): Promise<IRandomTrait[]> => {
    return await RandomTrait.find({})
}

export { getRandomTraits }