import IPossibleShop from "../../db/interfaces/shop/possible_shops";
import { Archetype } from "../../types/generator-options";

const farmingArchetypeMod = (shop: IPossibleShop): IPossibleShop => {
  const { name, SV } = shop;
  if (name === "Animal Supplies") return Object.assign(shop, { SV: SV * 0.75 })
  if (name === "Furriers") return Object.assign(shop, { SV: SV * 0.8 });
  if (name === "Animal Pound") return Object.assign(shop, { SV: SV * 0.75 });
  if (name === "Butchers") return Object.assign(shop, { SV: SV * 0.8 });
  if (name === "Hay Merchants") return Object.assign(shop, { SV: SV * 0.8 });
  if (name === "Mill") return Object.assign(shop, { SV: SV * 0.8 });
  return shop;
};

export default farmingArchetypeMod;
