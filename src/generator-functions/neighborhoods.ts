import { ISpecies } from "../db/interfaces/npc/species"
import randomInt, { randomArrayFromSum, randomIntInc, randomNumbersWithFixedSum } from "../shared/random-int";
import { Archetype, SettlementSize } from "../types/generator-options"
import { Neighborhood } from "../types/settlement";


type SpeciesDist = {
    species: ISpecies;
    distribution: number;
}

/*
* Metropolis: 5 - 12 neighborhoods
* City: 3 - 6 neighborhoods
* Town: 1 - 3 neighborhoods
*/
const createNeighborhoods = (pop: number, archetype: Archetype, species: SpeciesDist[], size: SettlementSize): Neighborhood[] => {
    if (size === 'CITY' || size === 'METROPOLIS' || size === 'TOWN') {
        const noRandom = { 'METROPOLIS': [5, 12], 'CITY': [3, 6], 'TOWN': [1, 3] }
        const [min, max] = noRandom[size]
        const noNeigh = randomIntInc(min, max)
        const popPerNeigh = randomArrayFromSum(noNeigh, pop, 50)
        return popPerNeigh.map((population): Neighborhood => ({ name: (Math.random() + 1).toString(36).substring(7), population, stores: [] }))
    }
    return [{ name: (Math.random() + 1).toString(36).substring(7), population: pop, stores: [] }]
}

export default createNeighborhoods

export { SpeciesDist }