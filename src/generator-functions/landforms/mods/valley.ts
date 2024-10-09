import { Shop } from "../../settlements";

const valleyTerrainMod = (shop: Shop) => {
  switch (shop.name) {
    case "Animal Supplies":
    case "Furriers":
    case "Butchers":
      return { ...shop, SV: shop.SV * 0.75 };
    case "Woodcarvers":
    case "Woodsellers":
      return { ...shop, SV: shop.SV * 0.8 };
    case "Saddlers":
    case "Inns":
    case "Tanners":
      return { ...shop, SV: shop.SV * 0.85 };
    case "Hay Merchants":
    case "Herbalist":
    case "Bakers":
    case "Mill":
      return { ...shop, SV: shop.SV * 0.9 };
    default:
      return shop;
  }
};

export { valleyTerrainMod };
