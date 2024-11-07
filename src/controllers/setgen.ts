import { Request, Response } from "express"
import { ISpecies } from "../db/interfaces/npc/species";
import numberPops from "../generator-functions/population";
import { generateShopsForSettlement } from "../generator-functions/settlements";
import { SetOptions, Archetype, SettlementSize, SettlementIncrementor, MagicLevel } from "../types/generator-options";
import createNeighborhoods from "../generator-functions/neighborhoods";


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
    console.log('pimba')
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const { name, climate, landform, archetype, species, size, incrementor, mLevel } = req.body
    const options: SetOptions = {
        name, climate, terrain: landform,
        size: size as SettlementSize,
        incrementor: incrementor as SettlementIncrementor,
        magicLevel: mLevel as MagicLevel,
        archetype: archetype as Archetype,
        species: species.map((species: ISpecies) => ({ species, distribution: 1 })),
        population: numberPops(size, incrementor),
        hasGuilds: true
    }
    const gen = createSettlement(options)

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

export { createSettlement }