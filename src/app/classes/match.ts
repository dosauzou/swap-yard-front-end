import { Item } from "./item";
import { Swap } from "./swap";
import { User } from "./user";

export class Match {
    user: User| any;
    itemList : Array<Item>
    itemId : Array<Number>
    swap: Swap;
  chatId: any;
}
