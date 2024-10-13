import { IClimate } from "../db/interfaces/land/climate";
import ILandform from "../db/interfaces/land/landform";
import { ISpecies } from "../db/interfaces/npc/species";

interface SetOptions {
  name: string;
  species: { species: ISpecies, distribution: number }[];
  terrain: ILandform;
  climate: IClimate;
  size: SettlementSize;
  hasGuilds: Boolean;
  magicLevel: MagicLevel;
  archetype: Archetype;
  incrementor?: SettlementIncrementor;
  population: number;
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
  SettlementSize,
  MagicLevel,
  SettlementIncrementor,
};
