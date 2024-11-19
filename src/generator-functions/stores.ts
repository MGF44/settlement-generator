import { InventoryItem } from "../types/store";
import INPC from "../db/schemas/npc/npc";

type StoreType = 'ADVENTURING SUPPLIES' |
  'ADVENTURING SUPPLIES_ARTS' |
  'ADVENTURING SUPPLIES_MAGICAL' |
  'ADVENTURING SUPPLIES_SHADY' |
  'ADVENTURING SUPPLIES_WATER' |
  'ARCANE SHOP' |
  'BLACKSMITH ARMORY' |
  'BOOKSTORE' |
  'CREATURES' |
  'FLETCHER BOWYER' |
  'GENERAL STORE' |
  'GROCER' |
  'HIGH END CLOTHING' |
  'INNS TAVERNS' |
  'JEWELER' |
  'LEATHERWORKER' |
  'POTION SHOP' |
  'SPECIAL_MATERIALS' |
  'TAILOR' |
  'TEMPLE_SUPPLIES' |
  'TRANSPORTATION';


class Store {
  storeName?: string;
  _archetype?: StoreType
  shopType: string;
  _inventory: InventoryItem[] = [];
  storeOwner!: INPC;
  storeApprentices?: INPC[]
  constructor(name: string, shopType: string, owner?: INPC, inventory?: InventoryItem[], archetype?: StoreType) {
    this.storeName = name
    if (owner) {
      this.storeOwner = owner
    }
    this.shopType = shopType
    if (inventory) {
      this.inventory = inventory;
    }
    if (archetype) {
      this._archetype = archetype
    }
  }

  set archetype(archetype: StoreType) {
    this._archetype = archetype
  }

  get archetype(): StoreType | undefined {
    return this._archetype
  }

  set inventory(inventory: InventoryItem[]) {
    this._inventory = inventory
  }

  get inventory(): InventoryItem[] {
    return this.inventory
  }

  addApprentice(npc: INPC) {
    this.storeApprentices?.push(npc)
  }

  addOwner(npc: INPC) {
    this.storeOwner = npc
  }
}


export { Store, StoreType }