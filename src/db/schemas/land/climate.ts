import mongoose, { model, Schema, Types } from "mongoose";
import { IClimate, ISubClimate } from "../../interfaces/land/climate";


const subClimateSchema = new Schema<ISubClimate>({
    name: { type: String, required: true },
    description: { type: String, required: true }
});

const SubClimate = model<ISubClimate>('SGSubClimate', subClimateSchema);

const climateSchema = new Schema<IClimate>({
    type: { type: String, required: true },
    subTypes: [{ type: Types.ObjectId, required: true, ref: 'SGSubClimate' }]
})

const Climate = model<IClimate>('SGClimate', climateSchema);


export { Climate, SubClimate };
