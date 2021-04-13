import { Horse } from "./horse";

export interface Hero {
  id: number;
  name: string;
  horse?: Horse;
}
