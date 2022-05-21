import { Item } from "./item";
import { Swap } from "./swap";
import { User } from "./user";

export class Match {
    user: User;
    itemList : Array<Item>
    swap: Swap;
  chatId: any;
}
