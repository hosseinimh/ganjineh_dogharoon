import { BASE_URL, PAGE_ITEMS } from "../../constants";
import Entity from "./Entity";

export class Member extends Entity {
  constructor() {
    super();
  }

  async getPaginate(
    villageId,
    nameFamily,
    nationalNo,
    memberNo,
    _pn = 1,
    _pi = PAGE_ITEMS
  ) {
    return await this.handlePost(`${BASE_URL}/u/members`, {
      village_id: villageId,
      name_family: nameFamily,
      national_no: nationalNo,
      member_no: memberNo,
      _pn,
      _pi,
    });
  }

  async get(id) {
    return await this.handlePost(`${BASE_URL}/u/members/show/${id}`);
  }

  async getWithVillages(id) {
    return await this.handlePost(`${BASE_URL}/u/members/show_w_villages/${id}`);
  }

  async getWithRelationships(id) {
    return await this.handlePost(
      `${BASE_URL}/u/members/show_w_relationships/${id}`
    );
  }

  async store(
    name,
    family,
    nationalNo,
    identityNo,
    fatherName,
    birthDate,
    membershiphDate,
    postalCode,
    gender,
    villageId,
    tel,
    mobile,
    address,
    description,
    memberNo
  ) {
    return await this.handlePost(`${BASE_URL}/a/members/store/${villageId}`, {
      name,
      family,
      national_no: nationalNo,
      identity_no: identityNo,
      father_name: fatherName,
      birth_date: birthDate,
      membership_date: membershiphDate,
      postal_code: postalCode,
      gender,
      tel,
      mobile,
      address,
      description,
      member_no: memberNo,
    });
  }

  async update(
    id,
    name,
    family,
    nationalNo,
    identityNo,
    fatherName,
    birthDate,
    membershiphDate,
    postalCode,
    gender,
    villageId,
    tel,
    mobile,
    address,
    description,
    memberNo
  ) {
    return await this.handlePost(
      `${BASE_URL}/a/members/update/${id}/${villageId}`,
      {
        name,
        family,
        national_no: nationalNo,
        identity_no: identityNo,
        father_name: fatherName,
        birth_date: birthDate,
        membership_date: membershiphDate,
        postal_code: postalCode,
        gender,
        tel,
        mobile,
        address,
        description,
        member_no: memberNo,
      }
    );
  }
}
