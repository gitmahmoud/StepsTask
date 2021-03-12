import { Item } from "./item";

export interface Step {
    id : number;
    stepName: string;

    items: Item[];
}
