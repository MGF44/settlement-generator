import { model, Schema, Types } from "mongoose";
import IShopArchetype from "../../interfaces/shop/shop_archetype";

const shopArchetypeSchema = new Schema<IShopArchetype>({
    archetype: { type: String, required: true },
    inventory: [{ type: Types.ObjectId, required: true, ref: 'InventoryItem' }],
});

const ShopArchetype = model<IShopArchetype>('ShopArchetype', shopArchetypeSchema);

export { ShopArchetype, shopArchetypeSchema };