import { Archetype } from "../../types/generator-options";
import { Shop } from "../settlements";

const tradeArchetypeMod = (shop: Shop): Shop => {
  const { name, SV } = shop;
  if (name === "Inns") return { ...shop, SV: SV * 0.75 };
  if (name === "General Goods Store") return { ...shop, SV: SV * 0.75 };
  if (name === "Indoor Market") return { ...shop, SV: SV * 0.75 };
  if (name === "Trade Post") return { ...shop, SV: SV * 0.75 };
  if (name === "Saddlers") return { ...shop, SV: SV * 0.8 };
  if (name === "Apothecaries") return { ...shop, SV: SV * 0.8 };
  if (name === "Brothel") return { ...shop, SV: SV * 0.8 };
  if (name === "Tailors") return { ...shop, SV: SV * 0.8 };
  if (name === "Scribe") return { ...shop, SV: SV * 0.8 };
  if (name === "Vehicle Maker") return { ...shop, SV: SV * 0.8 };
  if (name === "Theater") return { ...shop, SV: SV * 0.8 };
  if (name === "Occult Store") return { ...shop, SV: SV * 0.85 };
  if (name === "Weavers") return { ...shop, SV: SV * 0.85 };
  if (name === "Cartographer") return { ...shop, SV: SV * 0.85 };
  if (name === "Jewelers") return { ...shop, SV: SV * 0.9 };
  if (name === "Prison") return { ...shop, SV: SV * 0.95 };
  return shop;
};

export default tradeArchetypeMod;
