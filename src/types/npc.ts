import { Species } from "./generator-options";

export default interface NPC {
  name: string;
  gender: string;
  species: Species;
  eyes: string;
  hair: string;
  skin: string;
  additional: string;
}
