import { model, Schema, Types } from "mongoose";
import { ISubSpecies, ISpecies } from "../interfaces/npc/species";

const subSpeciesSchema = new Schema<ISubSpecies>({
    name: { type: String, required: true },
    distribution: { type: Number, required: false }
})
const SubSpecies = model<ISubSpecies>('SGSubspecies', subSpeciesSchema);


const speciesSchema = new Schema<ISpecies>({
    name: { type: String, required: true },
    subSpecies: [{ type: Types.ObjectId, required: false, ref: 'SGSubspecies' }],
    distribution: { type: Number, required: false }
});


const Species = model<ISpecies>('SGSpecies', speciesSchema);


export { Species, SubSpecies, speciesSchema };
