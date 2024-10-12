
interface ISpecies {
    name: string;
    subSpecies: ISpecies[];
    distribution: number;
}


interface ISubSpecies {
    name: string;
    distribution: number;
}

export { ISpecies, ISubSpecies };