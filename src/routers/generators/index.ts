import express from 'express'
import { gen } from '../../generator-functions/npcs'
import INPC from '../../db/schemas/npc/npc'


const router = express.Router()

router.post('/npc', (req, res) => {
    const { species } = req.body
    gen()
        .then((fns) => species ? fns.npc(species) : fns.random())
        .then((npc: INPC) => {
            const npcRes = {
                name: npc.name.name,
                gender: npc.gender,
                species: npc.species.name,
                eyes: npc.eyes.color,
                hair: npc.hair.color,
                skin: npc.skin.color
            }
            res.status(200).send(npcRes)
        })
        .catch((e) => res.status(500).send(e))
})


export default router