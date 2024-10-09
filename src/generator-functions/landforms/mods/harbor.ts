import { Shop } from "../../settlements";

const harborTerrainMod = (shop: Shop) => {
  switch (shop.name) {
    case "Fishmongers":
    case "Inns":
      return { ...shop, SV: shop.SV * 0.7 };
    case "Boatbuilders":
      return { ...shop, SV: shop.SV * 0.75 };
    case "Apothecaries":
      return { ...shop, SV: shop.SV * 0.8 };
    case "Blacksmiths":
      return { ...shop, SV: shop.SV * 0.9 };
    default:
      return shop;
  }
};

export { harborTerrainMod };
