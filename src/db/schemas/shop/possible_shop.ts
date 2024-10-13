import { model, Schema } from "mongoose";
import IPossibleShop from "../../interfaces/shop/possible_shops";

const possibleShopSchema = new Schema<IPossibleShop>({
    name: { type: String, required: true },
    SV: { type: Number, required: true },
    type: { type: String, required: true },
    archetype: { type: String, required: false }
});

const PossibleShop = model<IPossibleShop>('PossibleShop', possibleShopSchema);

export { PossibleShop, possibleShopSchema };