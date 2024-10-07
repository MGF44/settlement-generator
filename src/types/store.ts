class Store {}

interface Inventory {
  shopRack: InventoryItem[];
}

interface InventoryItem {
  name: string;
  description: string;
  buyingPrice?: number;
  sellingPrice: number;
  sellingCoin: string;
  category: string;
  availability: InventoryItemAvailability;
}

interface InventoryItemAvailability {
  villages: boolean;
  towns: boolean;
  cities: boolean;
}

export { Inventory, InventoryItem, InventoryItemAvailability };
