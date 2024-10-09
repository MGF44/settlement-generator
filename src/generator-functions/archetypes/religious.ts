import { Archetype } from "../../types/generator-options";
import { Shop } from "../settlements";

const religiousArchetypeMod = (shop: Shop): Shop => {
  const { name, SV } = shop;
  if (name === "Library") return { ...shop, SV: SV * 0.65 };
  if (name === "Temple") return { ...shop, SV: SV * 0.7 };
  if (name === "Fortune Teller") return { ...shop, SV: SV * 0.725 };
  if (name === "Clergy") return { ...shop, SV: SV * 0.75 };
  if (name === "Orphanage") return { ...shop, SV: SV * 0.75 };
  if (name === "School") return { ...shop, SV: SV * 0.75 };
  if (name === "Apothecaries") return { ...shop, SV: SV * 0.8 };
  if (name === "Herbalist") return { ...shop, SV: SV * 0.8 };
  if (name === "Mortician") return { ...shop, SV: SV * 0.8 };
  if (name === "Scribe") return { ...shop, SV: SV * 0.9 };
  return shop;
};

export default religiousArchetypeMod;
