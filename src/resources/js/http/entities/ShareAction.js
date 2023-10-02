import { BASE_URL, PAGE_ITEMS } from "../../constants";
import Entity from "./Entity";

export class ShareAction extends Entity {
    constructor() {
        super();
    }

    async getPaginate(ownerId, isMember, _pn = 1, _pi = PAGE_ITEMS) {
        return await this.handlePost(
            `${BASE_URL}/u/share_actions/${ownerId}/${isMember}`,
            {
                _pn,
                _pi,
            }
        );
    }

    async get(id) {
        return await this.handlePost(`${BASE_URL}/u/share_actions/show/${id}`);
    }

    async store(memberId, actionDate, actionType, count, description) {
        return await this.handlePost(
            `${BASE_URL}/a/share_actions/store/${memberId}`,
            {
                action_date: actionDate,
                action_type: actionType,
                count,
                description,
            }
        );
    }

    async update(id, actionDate, actionType, count, description) {
        return await this.handlePost(
            `${BASE_URL}/a/share_actions/update/${id}`,
            {
                action_date: actionDate,
                action_type: actionType,
                count,
                description,
            }
        );
    }
}
