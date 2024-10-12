import IInventoryItem from "../inventory_item";

interface IShopArchetype {
    archetype: string;
    inventory: IInventoryItem[]
}


export default IShopArchetype;