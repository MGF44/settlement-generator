import { model, Schema, Types } from "mongoose";
import IName from "../interfaces/npc/name";

const nameSchema = new Schema<IName>({
    name: { type: String, required: true },
    species: { type: Types.ObjectId, required: true, ref: 'SGSpecies' },
    gender: { type: String, required: true }
});

const Name = model<IName>('SGName', nameSchema);

export { Name, nameSchema };