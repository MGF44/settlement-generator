import IPossibleShop from "../../db/interfaces/shop/possible_shops";

const religiousArchetypeMod = (shop: IPossibleShop): IPossibleShop => {
  const { name, SV } = shop;
  if (name === "Library") return Object.assign(shop, { SV: SV * 0.65 });
  if (name === "Temple") return Object.assign(shop, { SV: SV * 0.7 });
  if (name === "Fortune Teller") return Object.assign(shop, { SV: SV * 0.725 });
  if (name === "Clergy") return Object.assign(shop, { SV: SV * 0.75 });
  if (name === "Orphanage") return Object.assign(shop, { SV: SV * 0.75 });
  if (name === "School") return Object.assign(shop, { SV: SV * 0.75 });
  if (name === "Apothecaries") return Object.assign(shop, { SV: SV * 0.8 });
  if (name === "Herbalist") return Object.assign(shop, { SV: SV * 0.8 });
  if (name === "Mortician") return Object.assign(shop, { SV: SV * 0.8 });
  if (name === "Scribe") return Object.assign(shop, { SV: SV * 0.9 });
  return shop;
};

export default religiousArchetypeMod;
