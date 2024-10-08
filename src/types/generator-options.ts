interface SetOptions {
  name: string;
  species: Species[];
  terrain: Landform;
  climate: Climate;
  size: SettlementSize;
  hasGuilds: Boolean;
  magicLevel: MagicLevel;
  archetype: Archetype;
  incrementor?: SettlementIncrementor;
}

interface Species {
  name: string;
  subSpecies: Species[];
  distribution: number;
}

interface Climate {
  type: string;
  subTypes: SubClimates[];
}

interface Landform extends Generic {}
interface SubClimates extends Generic {}

interface Generic {
  name: string;
  description: string;
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
  Species,
  Archetype,
  Climate,
  Landform,
  SubClimates,
  SettlementSize,
  MagicLevel,
  SettlementIncrementor,
};
