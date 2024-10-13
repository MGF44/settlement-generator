import IPossibleShop from "../../db/interfaces/shop/possible_shops";

const miningArchetypeMod = (shop: IPossibleShop): IPossibleShop => {
  const { name, SV } = shop;
  if (name === "Jewelers") return Object.assign(shop, { SV: SV * 0.6 });
  if (name === "Masons") return Object.assign(shop, { SV: SV * 0.7 });
  if (name === "Blacksmiths") return Object.assign(shop, { SV: SV * 0.75 });
  if (name === "Tinker") return Object.assign(shop, { SV: SV * 0.75 });
  if (name === "Locksmiths") return Object.assign(shop, { SV: SV * 0.75 });
  if (name === "Brothel") return Object.assign(shop, { SV: SV * 0.8 });
  if (name === "Tin Worker") return Object.assign(shop, { SV: SV * 0.8 });
  return shop;
};

export default miningArchetypeMod;
