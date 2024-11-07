import IPossibleShop from "../../db/interfaces/shop/possible_shops";

const noMagicMod = (shop: IPossibleShop): IPossibleShop => {
    const { name, SV } = shop;
    if (name === "Temple") return Object.assign(shop, { SV: SV * 1.2 });
    if (name === "Clergy") return Object.assign(shop, { SV: SV * 1.6 });
    if (name === "Exotic Goods") return Object.assign(shop, { SV: SV * 2 });
    if (name === "Herbalist") return Object.assign(shop, { SV: SV * 4 });
    if (name === "Tinker") return Object.assign(shop, { SV: SV * 4.8 });
    if (name === "Occult Store") return Object.assign(shop, { SV: SV * 4.8 });
    if (name === "Magical Adventuring Supplies") return Object.assign(shop, { SV: SV * 8 });
    if (name === "Arcane Shop") return Object.assign(shop, { SV: SV * 8 });
    if (name === "Apothecaries") return Object.assign(shop, { SV: SV * 8 });

    return shop;
};

export default noMagicMod;
