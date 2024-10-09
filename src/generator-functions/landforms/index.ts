import { Landform } from "../../types/generator-options";
import { harborTerrainMod } from "./mods/harbor";
import { hillsTerrainMod } from "./mods/hill";
import { plainsTerrainMod } from "./mods/plains";
import { plateauTerrainMod } from "./mods/plateau";
import { valleyTerrainMod } from "./mods/valley";

const landformMod = (landform: Landform) => {
  if (landform.name === "Valley") return valleyTerrainMod;
  if (landform.name === "Plain") return plainsTerrainMod;
  if (landform.name === "Plateau") return plateauTerrainMod;
  if (landform.name === "Hill") return hillsTerrainMod;
  if (landform.name === "Mountain Pass") return hillsTerrainMod;
  if (landform.name === "Harbor") return harborTerrainMod;
  if (landform.name === "Coastal Cliff") return harborTerrainMod;
  if (landform.name === "Peninsula") return harborTerrainMod;
};

export { landformMod };
