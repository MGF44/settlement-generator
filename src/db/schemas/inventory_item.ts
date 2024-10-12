import { model, Schema } from "mongoose";
import IInventoryItem from "../interfaces/shop/inventory_item";


const inventoryItemSchema = new Schema<IInventoryItem>({
    name: { type: String, required: true },
    type: { type: String, required: true },
    cost_normal: { type: String, required: true },
    cost_cheap: { type: String, required: true },
    cost_expensive: { type: String, required: true },
    limited_stock: { type: Boolean, required: true },
    rural_locale: { type: Boolean, required: true },
    urban_locale: { type: Boolean, required: true },
    premium_locale: { type: Boolean, required: true }
});

const InventoryItem = model<IInventoryItem>('InventoryItem', inventoryItemSchema);

export { InventoryItem, inventoryItemSchema };