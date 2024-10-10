
import { IClimate } from "../db/interfaces/climate";
import Generic from "../db/interfaces/generic";
import ILandform from "../db/interfaces/landform";
import Landform from "../db/interfaces/landform";
import { ISpecies } from "../db/interfaces/species";

interface SetOptions {
  name: string;
  species: ISpecies[];
  terrain: ILandform;
  climate: IClimate;
  size: SettlementSize;
  hasGuilds: Boolean;
  magicLevel: MagicLevel;
  archetype: Archetype;
  incrementor?: SettlementIncrementor;
}


type SettlementSize = "SETTLEMENT" | "VILLAGE" | "TOWN" | "CITY" | "METROPOLIS";
type SettlementIncrementor = "SMALL" | "REGULAR" | "LARGE";
type MagicLevel = "NO_MAGIC" | "LOW_MAGIC" | "COMMON_MAGIC" | "HIGH_MAGIC";
type Archetype =
  | "FISHING"
  | "MINING"
  | "TRADE"
  | "FARMING"
  | "RELIGIOUS"
  | "MILITARY"
  | "SHADY";

export {
  SetOptions,
  Archetype,
  Landform,
  SettlementSize,
  MagicLevel,
  SettlementIncrementor,
};
