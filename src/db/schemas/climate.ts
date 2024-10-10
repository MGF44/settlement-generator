import { model, Schema } from "mongoose";
import { IClimate, ISubClimate } from "../interfaces/climate";


const subClimateSchema = new Schema<ISubClimate>({
    name: { type: String, required: true },
    description: { type: String, required: true }
});

const SubClimate = model<ISubClimate>('SubClimate', subClimateSchema);

const climateSchema = new Schema<IClimate>({
    type: { type: String, required: true },
    subTypes: [{ type: subClimateSchema, required: true }]
});

const Climate = model<IClimate>('Climate', climateSchema);

export { Climate, SubClimate };
