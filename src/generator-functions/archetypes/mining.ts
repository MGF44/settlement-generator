import { Archetype } from "../../types/generator-options";
import { Shop } from "../settlements";

const miningArchetypeMod = (shop: Shop, archetype: Archetype): Shop => {
  const { name, SV } = shop;
  if (name === "Jewelers") return { ...shop, SV: SV * 0.6 };
  if (name === "Masons") return { ...shop, SV: SV * 0.7 };
  if (name === "Blacksmiths") return { ...shop, SV: SV * 0.75 };
  if (name === "Tinker") return { ...shop, SV: SV * 0.75 };
  if (name === "Locksmiths") return { ...shop, SV: SV * 0.75 };
  if (name === "Brothel") return { ...shop, SV: SV * 0.8 };
  if (name === "Tin Worker") return { ...shop, SV: SV * 0.8 };
  return shop;
};

export default miningArchetypeMod;
