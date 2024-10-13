import randomInt from "../shared/random-int";
import {
  SetOptions,
  SettlementIncrementor,
  SettlementSize,
} from "../types/generator-options";

const numberPops = (
  size: SettlementSize,
  inc: SettlementIncrementor | undefined
) => {
  const pops = {
    SETTLEMENT: () => randomInt(20, 50),
    VILLAGE: (inc: SettlementIncrementor | undefined) => {
      if (inc === "SMALL") return randomInt(50, 300);
      if (inc === "LARGE") return randomInt(600, 1000);
      return randomInt(300, 600);
    },
    TOWN: (inc: SettlementIncrementor | undefined) => {
      if (inc === "SMALL") return randomInt(1000, 3000);
      if (inc === "LARGE") return randomInt(6000, 8000);
      return randomInt(3000, 6000);
    },
    CITY: (inc: SettlementIncrementor | undefined) => {
      if (inc === "SMALL") return randomInt(8000, 10000);
      if (inc === "LARGE") return randomInt(12000, 14000);
      return randomInt(10000, 120000);
    },
    METROPOLIS: () => randomInt(20000, 60000),
  };
  return Math.round(pops[size](inc) / 10) * 10;
};


export default numberPops;
