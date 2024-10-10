import {
  SettlementIncrementor,
  SettlementSize,
} from "../../types/generator-options";
import { Shop } from "../settlements";
import { metSizeIncrementorMod } from "./metropolis";

// type SettlementSize = "SETTLEMENT" | "VILLAGE" | "TOWN" | "CITY" | "METROPOLIS";
// type SettlementIncrementor = "SMALL" | "REGULAR" | "LARGE";

const sizeIncrementorMod = (
  size: SettlementSize,
  inc: SettlementIncrementor,
  shop: Shop
) => {
  if (size === "METROPOLIS") {
    return metSizeIncrementorMod(shop);
  }
};

export { sizeIncrementorMod };
