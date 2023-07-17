import { BASE_URL } from "../../constants";
import Entity from "./Entity";

export class Dashboard extends Entity {
    constructor() {
        super();
    }

    async getFromUser() {
        return await this.handlePost(`${BASE_URL}/u/dashboard`);
    }

    async get() {
        return await this.handlePost(`${BASE_URL}/a/dashboard`);
    }
}
