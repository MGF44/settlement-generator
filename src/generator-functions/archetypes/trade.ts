import { Archetype } from "../../types/generator-options";
import { Shop } from "../settlements";

const tradeArchetypeMod = (shop: Shop, archetype: Archetype): Shop => {
  const { name, SV } = shop;
  if (name === "Barracks") return { ...shop, SV: SV * 0.6 };
  return shop;
};

export default tradeArchetypeMod;
