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

    async getAddProps(ownerId, isMember) {
        return await this.handlePost(
            `${BASE_URL}/a/share_actions/add/props/${ownerId}/${isMember}`
        );
    }

    async store(
        ownerId,
        isMember,
        actionDate,
        actionType,
        transactionDate,
        bank,
        invoiceNo,
        price,
        description
    ) {
        return await this.handlePost(
            `${BASE_URL}/a/share_actions/store/${ownerId}/${isMember}`,
            {
                action_date: actionDate,
                action_type: actionType,
                transaction_date: transactionDate,
                bank_id: bank,
                invoice_no: invoiceNo,
                price,
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
