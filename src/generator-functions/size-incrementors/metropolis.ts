import { Shop } from "../settlements";

const metSizeIncrementorMod = (shop: Shop) => {
  switch (shop.name) {
    case "Animal Supplies":
    case "Furriers":
    case "Animal Pound":
    case "Herbalist":
      return { ...shop, SV: shop.SV * 4 };
    case "Apothecaries":
      return { ...shop, SV: shop.SV * 3 };
    case "Temple":
      return { ...shop, SV: shop.SV * 2 };
    default:
      return shop;
  }
};
export { metSizeIncrementorMod };
