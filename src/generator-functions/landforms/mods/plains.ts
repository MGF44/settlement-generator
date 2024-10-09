import { Shop } from "../../settlements";

const plainsTerrainMod = (shop: Shop) => {
  switch (shop.name) {
    case "Animal Supplies":
    case "Butchers":
      return { ...shop, SV: shop.SV * 0.75 };
    case "Hay Merchants":
    case "Bakers":
    case "Tanners":
      return { ...shop, SV: shop.SV * 0.8 };
    case "Herbalist":
    case "Inns":
    case "Tailors":
      return { ...shop, SV: shop.SV * 0.85 };
    case "Mill":
      return { ...shop, SV: shop.SV * 0.9 };
    default:
      return shop;
  }
};

export { plainsTerrainMod };
