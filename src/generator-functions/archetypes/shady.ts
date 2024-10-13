import IPossibleShop from "../../db/interfaces/shop/possible_shops";

const shadyArchetypeMod = (shop: IPossibleShop): IPossibleShop => {
  const { name, SV } = shop;
  if (name === "Outdoor Market") Object.assign(shop, { SV: SV * 0.6 });
  if (name === "Thrift Store") Object.assign(shop, { SV: SV * 0.65 });
  if (name === "Black Market") Object.assign(shop, { SV: SV * 0.65 });
  if (name === "Brothel") Object.assign(shop, { SV: SV * 0.7 });
  if (name === "Tinker") Object.assign(shop, { SV: SV * 0.7 });
  if (name === "Fortune Teller") Object.assign(shop, { SV: SV * 0.7 });
  if (name === "Exotic Goods") Object.assign(shop, { SV: SV * 0.8 });
  if (name === "Library") Object.assign(shop, { SV: SV * 0.8 });
  if (name === "Occult Store") Object.assign(shop, { SV: SV * 0.85 });
  if (name === "Temple") Object.assign(shop, { SV: SV * 0.9 });
  return shop;
};

export default shadyArchetypeMod;
