import { IEyes, IHair } from "../../interfaces/npc/eyes_hair";
import IName from "../../interfaces/npc/name";
import IRandomTrait from "../../interfaces/npc/random_trait";
import { ISkin } from "../../interfaces/npc/skin";
import { ISpecies } from "../../interfaces/npc/species";

interface INPC {
    name: IName;
    gender: string;
    species: ISpecies;
    eyes: IEyes;
    hair: IHair;
    skin: ISkin;
    additionalTraits?: IRandomTrait ;
}

export default INPC;