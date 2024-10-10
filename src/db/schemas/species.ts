import { model, Schema } from "mongoose";
import { IClimate, ISubClimate } from "../interfaces/climate";
import { ISpecies, ISubSpecies } from "../interfaces/species";


const subSpeciesSchema = new Schema<ISubSpecies>({
    name: { type: String, required: true },
    distribution: { type: Number, required: false }
})
const speciesSchema = new Schema<ISpecies>({
    name: { type: String, required: true },
    subSpecies: [{ type: subSpeciesSchema, required: false }],
    distribution: { type: Number, required: false }
});
const SubSpecies = model<ISubSpecies>('SubSpecies', subSpeciesSchema);
const Species = model<ISpecies>('Species', speciesSchema);

export { Species, SubSpecies, speciesSchema };
