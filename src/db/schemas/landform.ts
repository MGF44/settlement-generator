import { model, Schema } from "mongoose";
import ILandform from "../interfaces/landform";

const landformSchema = new Schema<ILandform>({
    name: { type: String, required: true },
    description: { type: String, required: true }
});


const Landform = model<ILandform>('Landform', landformSchema);

export default Landform;
