import ILandform from "../../interfaces/land/landform"
import Landform from "../../schemas/land/landform"

const getLandforms = async (): Promise<ILandform[]> => {
    return await Landform.find({})
}

export { getLandforms }