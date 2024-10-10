import { model, Schema } from "mongoose";
import { IClimate, ISubClimate } from "../interfaces/climate";
import { ISpecies, ISubSpecies } from "../interfaces/species";
import { speciesSchema } from "./species";
import IName from "../interfaces/name";



const nameSchema = new Schema<IName>({
    name: { type: String, required: true },
    species: { type: speciesSchema, required: true },
    gender: { type: String, required: true }
});

const Name = model<IName>('Name', nameSchema);

export { Name, nameSchema };