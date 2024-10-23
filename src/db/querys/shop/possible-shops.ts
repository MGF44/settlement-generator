import { IClimate } from "../../interfaces/land/climate"
import IPossibleShop from "../../interfaces/shop/possible_shops"
import { Climate } from "../../schemas/land/climate"
import { PossibleShop } from "../../schemas/shop/possible_shop"

const getPossibleShops = async (): Promise<IPossibleShop[]> => {
    return await PossibleShop.find({})
}

export { getPossibleShops }