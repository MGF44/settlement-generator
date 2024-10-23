import { Store } from "../generator-functions/stores";

interface Settlement {
    name: string;
    neighborhoods: Neighborhood[];
    population: number;
}

interface Neighborhood {
    name: string;
    population: number;
    stores: Store[];
}
export { Settlement, Neighborhood }