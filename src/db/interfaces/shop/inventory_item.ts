interface IInventoryItem {
    name: string,
    type: string,
    cost_normal: string,
    cost_cheap: string,
    cost_expensive: string,
    limited_stock: boolean,
    rural_locale: boolean,
    urban_locale: boolean,
    premium_locale: boolean
}

export default IInventoryItem