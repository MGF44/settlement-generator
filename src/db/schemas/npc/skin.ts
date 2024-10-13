import { model, Schema } from "mongoose";
import { ISkin } from "../../interfaces/npc/skin";

const skinSchema = new Schema<ISkin>({
    color: { type: String, required: true },
    basic: {
        light: {
            min: { type: Number, required: true },
            max: { type: Number, required: true }
        },
        tan: {
            min: { type: Number, required: true },
            max: { type: Number, required: true }
        },
        dark: {
            min: { type: Number, required: true },
            max: { type: Number, required: true }
        },
        any: {
            min: { type: Number, required: true },
            max: { type: Number, required: true }
        }
    },
    exotic: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    fey: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    }
});

const Skin = model<ISkin>('Skin', skinSchema);

export { Skin, skinSchema };