import ILandform from "../../interfaces/landform"
import Landform from "../../schemas/landform"

const getLandforms = async (): Promise<ILandform[]> => {
    return await Landform.find({})
}

export { getLandforms }