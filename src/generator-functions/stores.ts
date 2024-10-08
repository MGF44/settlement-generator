import { log } from "console";
import fs from "fs";
import { InventoryItemAvailability } from "../types/store";
import { SetOptions } from "../types/generator-options";

const availability = (
  village: boolean,
  town: boolean,
  city: boolean
): undefined => {};



// const readInventoriesJSONs = (opt: SetOptions, pop: number) => {


//   const prompt = `
//   ${json["UniqueProfessions"]
//     .map((v: any) => {
//       const storeNumber = getNumberOfStores(pop, v["SV"]);
//       if (storeNumber > 0) {
//         console.log(v["name"] + ": " + storeNumber);
//       }
//     })
//     .join("\n")}
//   `;
// };

// export default readInventoriesJSONs;
