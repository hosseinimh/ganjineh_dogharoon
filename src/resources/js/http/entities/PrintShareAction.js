import { BASE_URL, PAGE_ITEMS } from "../../constants";
import Entity from "./Entity";

export class PrintShareAction extends Entity {
    constructor() {
        super();
    }

    async getPaginate(ownerId, isMember, _pn = 1, _pi = PAGE_ITEMS) {
        return await this.handlePost(
            `${BASE_URL}/u/print_share_actions/${ownerId}/${isMember}`,
            {
                _pn,
                _pi,
            }
        );
    }
}
