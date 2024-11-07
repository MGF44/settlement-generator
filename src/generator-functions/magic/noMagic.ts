import IPossibleShop from "../../db/interfaces/shop/possible_shops";

const noMagicMod = (shop: IPossibleShop): IPossibleShop => {
    const { name, SV } = shop;
    if (name === "Fortune Teller") return Object.assign(shop, { SV: SV * 1.2 });
    if (name === "Library") return Object.assign(shop, { SV: SV * 1.25 });
    if (name === "Temple") return Object.assign(shop, { SV: SV * 1.5 });
    if (name === "Clergy") return Object.assign(shop, { SV: SV * 2 });
    if (name === "Exotic Goods") return Object.assign(shop, { SV: SV * 2.5 });
    if (name === "Herbalist") return Object.assign(shop, { SV: SV * 5 });
    if (name === "Tinker") return Object.assign(shop, { SV: SV * 6 });
    if (name === "Occult Store") return Object.assign(shop, { SV: SV * 6 });
    if (name === "Magical Adventuring Supplies") return Object.assign(shop, { SV: SV * 10 });
    if (name === "Arcane Shop") return Object.assign(shop, { SV: SV * 10 });
    if (name === "Apothecaries") return Object.assign(shop, { SV: SV * 10 });

    return shop;
};

export default noMagicMod;
