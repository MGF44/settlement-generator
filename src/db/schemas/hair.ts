import { model, Schema } from "mongoose";
import { IHair } from "../interfaces/npc/eyes_hair";

const hairSchema = new Schema<IHair>({
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

const Hair = model<IHair>('Hair', hairSchema);

export { Hair, hairSchema };