import { Shop } from "../../settlements";

const hillsTerrainMod = (shop: Shop) => {
  switch (shop.name) {
    case "Blacksmiths":
    case "Butchers":
      return { ...shop, SV: shop.SV * 0.75 };
    case "Inns":
    case "Tanners":
      return { ...shop, SV: shop.SV * 0.8 };
    case "Tailors":
      return { ...shop, SV: shop.SV * 0.85 };
    default:
      return shop;
  }
};

export { hillsTerrainMod };
