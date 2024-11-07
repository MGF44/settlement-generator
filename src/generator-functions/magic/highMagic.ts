import IPossibleShop from "../../db/interfaces/shop/possible_shops";

const noMagicMod = (shop: IPossibleShop): IPossibleShop => {
    const { name, SV } = shop;
    if (name === "Magical Adventuring Supplies") return Object.assign(shop, { SV: SV * 0.7 });
    if (name === "Apothecaries") return Object.assign(shop, { SV: SV * 7 });
    if (name === "Fortune Teller") return Object.assign(shop, { SV: SV * 0.75 });
    if (name === "Arcane Shop") return Object.assign(shop, { SV: SV * 0.75 });
    if (name === "Library") return Object.assign(shop, { SV: SV * 0.8 });
    if (name === "Tinker") return Object.assign(shop, { SV: SV * 0.8 });
    if (name === "Occult Store") return Object.assign(shop, { SV: SV * 0.8 });

    return shop;
};

export default noMagicMod;
