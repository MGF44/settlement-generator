interface ISkin {
    color: string;
    basic: {
        light: { min: number, max: number },
        tan: { min: number, max: number },
        dark: { min: number, max: number },
        any: { min: number, max: number },
    },
    exotic: { min: number, max: number },
    fey: { min: number, max: number }
}




export { ISkin }