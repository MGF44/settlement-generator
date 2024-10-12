import Generic from "../npc/generic";


interface IClimate {
    type: string;
    subTypes: ISubClimate[];
}

interface ISubClimate extends Generic { }


export { IClimate, ISubClimate }