import { Shop } from "../../settlements";

const plateauTerrainMod = (shop: Shop) => {
  switch (shop.name) {
    case "Blacksmiths":
    case "Inns":
      return { ...shop, SV: shop.SV * 0.75 };
    case "Tailors":
    case "Tanners":
      return { ...shop, SV: shop.SV * 0.8 };
    case "Woodcarvers":
    case "Apothecaries":
      return { ...shop, SV: shop.SV * 0.85 };
    default:
      return shop;
  }
};

export { plateauTerrainMod };
