import express, { Request, Response } from 'express'
import { getClimates } from '../../db/querys/nature/climate'
import { IClimate } from '../../db/interfaces/land/climate'
import ILandform from '../../db/interfaces/land/landform'
import { getLandforms } from '../../db/querys/nature/landform'
import { getSpecies } from '../../db/querys/species/species'
import { ISpecies } from '../../db/interfaces/npc/species'

const router = express.Router()

router.get('/climates', (req, res) => {
    getClimates()
        .then((value: IClimate[]) => res.json(value))
        .catch((reason) => res.status(500).send(reason))
})

router.get('/landforms', (req, res) => {
    getLandforms()
        .then((value: ILandform[]) => res.json(value))
        .catch((reason) => res.status(500).send(reason))
})

router.get('/species', (req, res) => {
    getSpecies()
        .then((value: ISpecies[]) => res.json(value))
        .catch((reason) => res.status(500).send(reason))
})
// define the about route
router.get('/about', (req, res) => {
    res.send('About birds')
})

export default router;