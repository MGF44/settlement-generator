import { Router } from 'express'
import { gen } from '../../generator-functions/npcs'
import INPC from '../../db/schemas/npc/npc'
import { ISpecies } from '../../db/interfaces/npc/species'


const router = Router()

router.post('/npc', (req, res) => {
    gen()
        .then((fns) => {
            const { species, ageGroup } = req.body
            if (!!species) {
                return fns.npc(species, ageGroup)
            }
            return fns.random(ageGroup)
        })
        .then((npc: INPC) => {
            const npcRes = {
                name: npc.name.name,
                gender: npc.gender,
                species: npc.species.name,
                eyes: npc.eyes.color,
                hair: npc.hair.color,
                skin: npc.skin.color,
                age: npc.age
            }
            res.status(200).send(npcRes)
        })
        .catch((e) => {
            return res.status(500).send(e)
        })
})


export default router