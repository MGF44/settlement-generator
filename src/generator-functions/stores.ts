import { log } from "console";
import fs from "fs";
import { InventoryItemAvailability } from "../types/store";


const availability = (village: boolean, town: boolean, city: boolean) : undefined => {


}

const readInventoriesJSONs = () => {
  const inventories = "./src/assets/inventory_shops";

  const files = fs.readdirSync(inventories);
  const keysRaw = files.map((path: any) => {
    const json = JSON.parse(fs.readFileSync(inventories + "/" + path, "utf8"));
    Object.entries(json).map(([key, value]) => {
      if (Array.isArray(value)) {
        value.map((value) => {
          if (value["Price"]) {
            return {
              name: value["Item Name"],
              description: "",
              sellingPrice: value["Price"],
              buyingPrice: value["Price"] * 1.25,
              sellingCoin: value["Currency"],
              category: "GEMS",
              availability: {}
              
            };
          }
          if (value["Item Name"] === "Holy Symbol") {
            return { 

            }
          }
          if (value["Cost"]) {
            return {
              name: value["Item Name"],
              description: "",
              sellingPrice: value["Cost"],
              buyingPrice: 0,
              sellingCoin: value["Currency"],
              category: "SERVICE",
              availability
            };
          // console.log(value)
          // console.log(JSON.stringify(value))
          // console.log(value["Village"]);
          // console.log(value["Town"]);
          // console.log(value["City"]);
        });
      } else {
        // console.log(key + ' /// is not array')
      }
    });

    return 1;
  }, []);
  // const keys = keysRaw.reduce((p: string[], c: string[]) => [...p, ...c]);
  // const uniqueKeys = [...new Set(keys)]
  // console.log(uniqueKeys)
};

export default readInventoriesJSONs;
