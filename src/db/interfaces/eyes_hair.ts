interface EyesHair {
    color: string;
    basic: { min: number, max: number },
    exotic: { min: number, max: number },
    pale: { min: number, max: number },
    fey: { min: number, max: number }
}


interface IEyes extends EyesHair { }
interface IHair extends EyesHair { }


export { IEyes, IHair }