import IPossibleShop from "../../db/interfaces/shop/possible_shops";
import { Archetype } from "../../types/generator-options";

const militaryArchetypeMod = (shop: IPossibleShop): IPossibleShop => {
  const { name, SV } = shop;
  if (name === "Barracks") return Object.assign(shop, { SV: SV * 0.6 });
  if (name === "Armor and Weapons Shop") return Object.assign(shop, { SV: SV * 0.75 });
  if (name === "City Guard") return Object.assign(shop, { SV: SV * 0.8 });
  if (name === "Prison") return Object.assign(shop, { SV: SV * 0.8 });
  if (name === "Blacksmiths") return Object.assign(shop, { SV: SV * 0.9 });
  if (name === "Saddlers") return Object.assign(shop, { SV: SV * 0.9 });
  if (name === "Apothecaries") return Object.assign(shop, { SV: SV * 0.9 });
  if (name === "Brothel") return Object.assign(shop, { SV: SV * 0.9 });
  return shop;
};

export default militaryArchetypeMod;
