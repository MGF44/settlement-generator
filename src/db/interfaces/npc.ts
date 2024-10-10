import { ISpecies } from "./species";

interface NPC {
    name: string;
    gender: string;
    species: ISpecies;
    eyes: string;
    hair: string;
    skin: string;
    additional: string;
}

export default NPC