import { BASE_URL, PAGE_ITEMS } from "../../constants";
import Entity from "./Entity";

export class Relationship extends Entity {
  constructor() {
    super();
  }

  async getPaginate(_pn = 1, _pi = PAGE_ITEMS) {
    return await this.handlePost(`${BASE_URL}/u/relationships`, {
      _pn,
      _pi,
    });
  }

  async getAll() {
    return await this.handlePost(`${BASE_URL}/u/relationships/all`);
  }

  async get(id) {
    return await this.handlePost(`${BASE_URL}/u/relationships/show/${id}`);
  }

  async store(name) {
    return await this.handlePost(`${BASE_URL}/a/relationships/store`, {
      name,
    });
  }

  async update(id, name) {
    return await this.handlePost(`${BASE_URL}/a/relationships/update/${id}`, {
      name: name,
    });
  }
}
