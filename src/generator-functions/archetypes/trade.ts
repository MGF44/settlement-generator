import IPossibleShop from "../../db/interfaces/shop/possible_shops";
import { Archetype } from "../../types/generator-options";

const tradeArchetypeMod = (shop: IPossibleShop): IPossibleShop => {
  const { name, SV } = shop;
  if (name === "Inns") return Object.assign(shop, { SV: SV * 0.75 });
  if (name === "General Goods Store") return Object.assign(shop, { SV: SV * 0.75 });
  if (name === "Indoor Market") return Object.assign(shop, { SV: SV * 0.75 });
  if (name === "Trade Post") return Object.assign(shop, { SV: SV * 0.75 });
  if (name === "Saddlers") return Object.assign(shop, { SV: SV * 0.8 });
  if (name === "Apothecaries") return Object.assign(shop, { SV: SV * 0.8 });
  if (name === "Brothel") return Object.assign(shop, { SV: SV * 0.8 });
  if (name === "Tailors") return Object.assign(shop, { SV: SV * 0.8 });
  if (name === "Scribe") return Object.assign(shop, { SV: SV * 0.8 });
  if (name === "Vehicle Maker") return Object.assign(shop, { SV: SV * 0.8 });
  if (name === "Theater") return Object.assign(shop, { SV: SV * 0.8 });
  if (name === "Occult Store") return Object.assign(shop, { SV: SV * 0.85 });
  if (name === "Weavers") return Object.assign(shop, { SV: SV * 0.85 });
  if (name === "Cartographer") return Object.assign(shop, { SV: SV * 0.85 });
  if (name === "Jewelers") return Object.assign(shop, { SV: SV * 0.9 });
  if (name === "Prison") return Object.assign(shop, { SV: SV * 0.95 });
  return shop;
};

export default tradeArchetypeMod;
