import { Archetype } from "../../types/generator-options";
import { Shop } from "../settlements";

const militaryArchetypeMod = (shop: Shop): Shop => {
  const { name, SV } = shop;
  if (name === "Barracks") return { ...shop, SV: SV * 0.6 };
  if (name === "Armor and Weapons Shop") return { ...shop, SV: SV * 0.75 };
  if (name === "City Guard") return { ...shop, SV: SV * 0.8 };
  if (name === "Prison") return { ...shop, SV: SV * 0.8 };
  if (name === "Blacksmiths") return { ...shop, SV: SV * 0.9 };
  if (name === "Saddlers") return { ...shop, SV: SV * 0.9 };
  if (name === "Apothecaries") return { ...shop, SV: SV * 0.9 };
  if (name === "Brothel") return { ...shop, SV: SV * 0.9 };
  return shop;
};

export default militaryArchetypeMod;
