import { model, Schema } from "mongoose";
import IRandomTrait from "../interfaces/random_trait";


const randomTraitSchema = new Schema<IRandomTrait>({
    roll: { type: Number, required: true },
    description: { type: String, required: true }
});

const RandomTrait = model<IRandomTrait>('RandomTrait', randomTraitSchema);

export { RandomTrait, randomTraitSchema };