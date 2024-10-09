import { Archetype } from "../../types/generator-options";
import { Shop } from "../settlements";

const shadyArchetypeMod = (shop: Shop): Shop => {
  const { name, SV } = shop;
  if (name === "Outdoor Market") return { ...shop, SV: SV * 0.6 };
  if (name === "Thrift Store") return { ...shop, SV: SV * 0.65 };
  if (name === "Black Market") return { ...shop, SV: SV * 0.65 };
  if (name === "Brothel") return { ...shop, SV: SV * 0.7 };
  if (name === "Tinker") return { ...shop, SV: SV * 0.7 };
  if (name === "Fortune Teller") return { ...shop, SV: SV * 0.7 };
  if (name === "Exotic Goods") return { ...shop, SV: SV * 0.8 };
  if (name === "Library") return { ...shop, SV: SV * 0.8 };
  if (name === "Occult Store") return { ...shop, SV: SV * 0.85 };
  if (name === "Temple") return { ...shop, SV: SV * 0.9 };
  return shop;
};

export default shadyArchetypeMod;
