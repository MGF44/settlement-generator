import { Archetype } from "../../types/generator-options";
import { Shop } from "../settlements";

const farmingArchetypeMod = (shop: Shop): Shop => {
  const { name, SV } = shop;
  if (name === "Animal Supplies") return { ...shop, SV: SV * 0.75 };
  if (name === "Furriers") return { ...shop, SV: SV * 0.8 };
  if (name === "Animal Pound") return { ...shop, SV: SV * 0.75 };
  if (name === "Butchers") return { ...shop, SV: SV * 0.8 };
  if (name === "Hay Merchants") return { ...shop, SV: SV * 0.8 };
  if (name === "Mill") return { ...shop, SV: SV * 0.8 };
  return shop;
};

export default farmingArchetypeMod;
