import IPossibleShop from "../../db/interfaces/shop/possible_shops";
import { Archetype } from "../../types/generator-options";

const fishingArchetypeMod = (shop: IPossibleShop): IPossibleShop => {
  const { name, SV } = shop;
  if (name === "Fishmongers") return Object.assign(shop, { SV: SV * 0.6 });
  if (name === "Inns") return Object.assign(shop, { SV: SV * 0.75 });
  if (name === "Brothel") return Object.assign(shop, { SV: SV * 0.8 });
  if (name === "Black Market") return Object.assign(shop, { SV: SV * 0.8 });
  if (name === "Exotic Goods") return Object.assign(shop, { SV: SV * 0.9 });
  if (name === "Weavers") return Object.assign(shop, { SV: SV * 0.6 });
  if (name === "Ropemakers") return Object.assign(shop, { SV: SV * 0.6 });
  if (name === "Woodcarvers") return Object.assign(shop, { SV: SV * 0.6 });
  if (name === "Woodsellers") return Object.assign(shop, { SV: SV * 0.6 });
  if (name === "Outdoor Market") return Object.assign(shop, { SV: SV * 0.5 });
  if (name === "Boatbuilders") return Object.assign(shop, { SV: SV * 0.6 });
  return shop;
};

export default fishingArchetypeMod;
