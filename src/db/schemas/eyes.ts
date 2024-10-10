import { model, Schema } from "mongoose";
import { IEyes } from "../interfaces/eyes_hair";

const eyesSchema = new Schema<IEyes>({
    color: { type: String, required: true },
    basic: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    exotic: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    pale: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    fey: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    }
});

const Eyes = model<IEyes>('Eyes', eyesSchema);

export { Eyes, eyesSchema };