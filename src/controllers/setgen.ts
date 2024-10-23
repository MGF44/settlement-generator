import { randomInt } from "crypto";
import { Request, Response } from "express"
import { IClimate } from "../db/interfaces/land/climate";
import ILandform from "../db/interfaces/land/landform";
import { ISpecies } from "../db/interfaces/npc/species";
import { getClimates } from "../db/querys/nature/climate";
import { getLandforms } from "../db/querys/nature/landform";
import { getSpecies } from "../db/querys/species/species";
import numberPops from "../generator-functions/population";
import { generateShopsForSettlement } from "../generator-functions/settlements";
import { randomArrayFromSum, randomNumbersWithFixedSum } from "../shared/random-int";
import { SetOptions, Archetype, SettlementSize, SettlementIncrementor, MagicLevel } from "../types/generator-options";
import createNeighborhoods from "../generator-functions/neighborhoods";

const createOptions = async (): Promise<SetOptions> => {
    const climates: IClimate[] = await getClimates();
    const terrains: ILandform[] = await getLandforms();
    const speciesList: ISpecies[] = await getSpecies();
    const archetypes: Archetype[] = ["FISHING", "MINING", "TRADE", "FARMING", "RELIGIOUS", "MILITARY", "SHADY"];
    const climate: IClimate = climates[randomInt(0, climates.length - 1)];
    const terrain: ILandform = terrains[randomInt(0, terrains.length - 1)];
    const archetype: Archetype = archetypes[randomInt(0, archetypes.length - 1)];
    const sizes: SettlementSize[] = ["SETTLEMENT", "VILLAGE", "TOWN", "CITY", "METROPOLIS"];
    const incrementors: SettlementIncrementor[] = ["SMALL", "REGULAR", "LARGE"];
    const mLevels: MagicLevel[] = ["NO_MAGIC", "LOW_MAGIC", "COMMON_MAGIC", "HIGH_MAGIC"];
    const species = speciesList.sort(() => 0.5 - Math.random()).slice(0, randomInt(0, speciesList.length / 2) + 1);
    const size = sizes[randomInt(0, sizes.length - 1)];
    const incrementor = ["VILLAGE", "TOWN", "CITY"].filter((v: string) => v === size).length > 0 ? incrementors[randomInt(0, incrementors.length - 1)] : undefined;
    const distribution = randomArrayFromSum(species.length, 100, 12);

    const newSpecies = species
        .map((species: ISpecies, ix: number) => ({ species, distribution: distribution[ix] }))
        .filter((v: any) => v.distribution != 0);
    const population = numberPops(size, incrementor)

    return {
        name: (Math.random() + 1).toString(36).substring(7),
        species: newSpecies,
        terrain,
        climate,
        size,
        magicLevel: mLevels[randomInt(0, mLevels.length - 1)],
        hasGuilds: true,
        incrementor,
        archetype,
        population
    };
};


async function* createSettlement(opt: SetOptions) {
    const neighborhoods = createNeighborhoods(opt.population, opt.archetype, opt.species, opt.size).sort((a, b) => b.population - a.population)
    const res = generateShopsForSettlement(opt)
    let braker = true;
    yield neighborhoods;
    while (braker) {
        const { value, done } = await res.next()
        if (done) {
            braker = false;
        }
        if (!!value) {
            if (neighborhoods.length === 1) {
                neighborhoods[0].stores.push(...value);
            } else {
                let sum = 0;
                for (let ix = 0; ix < neighborhoods.length; ix++) {
                    const hood = neighborhoods[ix];
                    if (sum === value.length) {
                        break;
                    }
                    hood.stores.push(value[sum])
                    sum += 1;
                }
                yield neighborhoods
            }
        }
    }
    yield neighborhoods
}

const setGen = async (req: Request, res: Response) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const gen = createSettlement(await createOptions())

    while (true) {
        const { value, done } = await gen.next()
        if (!!done) {
            break;
        }
        res.write(`${JSON.stringify(value)}\n\n`);
    }
    res.end()
}

export default setGen

export { createSettlement, createOptions }