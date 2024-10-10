import { log } from "console";
import fs from "fs";
import { InventoryItemAvailability } from "../types/store";
import { SetOptions } from "../types/generator-options";
import path from "path";


type StoreType = 'ADVENTURING SUPPLIES' |
  'ADVENTURING SUPPLIES ARTS' |
  'ADVENTURING SUPPLIES MAGICAL' |
  'ADVENTURING SUPPLIES SHADY' |
  'ADVENTURING SUPPLIES WATER' |
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

interface InventoryItem {
  name: string,
  type: string,
  cost_normal: string,
  cost_cheap: string,
  cost_expensive: string,
  limited_stock: boolean,
  rural_locale: boolean,
  urban_locale: boolean,
  premium_locale: boolean
}

interface Store {
  type: StoreType;
  inventory: InventoryItem[]
}

const readInventoriesJSONs = (opt: SetOptions, pop: number) => {
  const inventories = path.resolve("src", "assets", "inventory_shops");
  const files = fs.readdirSync(inventories);
  for (let index = 0; index < files.length; index++) {
    const element = files[index];
    const raw = fs.readFileSync(inventories.concat("/", element), "utf8");
    const inventory = JSON.parse(raw);
    const [title] = element.split('.')
    const type = title.replace('_', ' ').toUpperCase() as StoreType
    const store: Store = { type, inventory }
  }
};

export default readInventoriesJSONs;
