import { StoreType } from "../../../generator-functions/stores";

interface IPossibleShop {
    name: string;
    SV: number;
    type: string;
    archetype?: StoreType;
}

export default IPossibleShop;