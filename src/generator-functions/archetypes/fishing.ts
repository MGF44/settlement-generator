import { Archetype } from "../../types/generator-options";
import { Shop } from "../settlements";

const fishingArchetypeMod = (shop: Shop): Shop => {
  const { name, SV } = shop;
  if (name === "Fishmongers") return { ...shop, SV: SV * 0.6 };
  if (name === "Inns") return { ...shop, SV: SV * 0.75 };
  if (name === "Brothel") return { ...shop, SV: SV * 0.8 };
  if (name === "Black Market") return { ...shop, SV: SV * 0.8 };
  if (name === "Exotic Goods") return { ...shop, SV: SV * 0.9 };
  if (name === "Weavers") return { ...shop, SV: SV * 0.6 };
  if (name === "Ropemakers") return { ...shop, SV: SV * 0.6 };
  if (name === "Woodcarvers") return { ...shop, SV: SV * 0.6 };
  if (name === "Woodsellers") return { ...shop, SV: SV * 0.6 };
  if (name === "Outdoor Market") return { ...shop, SV: SV * 0.5 };
  if (name === "Boatbuilders") return { ...shop, SV: SV * 0.6 };
  return shop;
};

export default fishingArchetypeMod;
