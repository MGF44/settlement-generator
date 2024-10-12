import { Shop } from "../settlements"

const metropolisMod = (shop: Shop) => {
    const { SV } = shop
    switch (shop.name) {
        case "Butchers":
        case "Fishmongers":
        case "Bath House":
        case "Mortician":
        case "Orphanage":
        case "Winery":
        case "Tailors":
        case "Weavers":
        case "Jewelers":
        case "Painters":
            return { ...shop, SV: SV * 1.5 }
        case "Clergy":
        case "Apothecaries":
        case "Blacksmiths":
        case "Prison":
        case "Grocer":
        case "Bakers":
        case "Mill":
        case "Carpenters":
        case "Noble Households":
            return { ...shop, SV: SV * 2 }
        case "Brewery":
        case "Masons":
        case "Cartographer":
            return { ...shop, SV: SV * 2.5 }
        case "Furriers":
        case "Saddlers":
        case "Temple":
        case "Herbalist":
        case "City Guard":
        case "Armor and Weapons Shop":
        case "Barracks":
        case "Barbers":
        case "Taverns/Restaurants":
            return { ...shop, SV: SV * 4 }
        case "Animal Pound":
        case "Hay Merchants":
            return { ...shop, SV: SV * 6 }
        case "Animal Supplies":
        case "Maidservants":
            return { ...shop, SV: SV * 8 }
        default:
            return shop;
    }
}

export default metropolisMod