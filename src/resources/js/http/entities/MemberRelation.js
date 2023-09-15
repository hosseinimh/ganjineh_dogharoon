import { BASE_URL, PAGE_ITEMS } from "../../constants";
import Entity from "./Entity";

export class MemberRelation extends Entity {
    constructor() {
        super();
    }

    async getPaginate(memberId, _pn = 1, _pi = PAGE_ITEMS) {
        return await this.handlePost(
            `${BASE_URL}/u/member_relations/${memberId}`,
            {
                _pn,
                _pi,
            }
        );
    }

    async getAll(
        villageId,
        name,
        family,
        nationalNo,
        cardNo,
        _pn = 1,
        _pi = PAGE_ITEMS
    ) {
        return await this.handlePost(`${BASE_URL}/u/member_relations`, {
            village_id: villageId,
            name,
            family,
            national_no: nationalNo,
            card_no: cardNo,
            _pn,
            _pi,
        });
    }

    async get(id) {
        return await this.handlePost(
            `${BASE_URL}/u/member_relations/show/${id}`
        );
    }

    async getWithRelationships(id) {
        return await this.handlePost(
            `${BASE_URL}/u/member_relations/show_w_relationships/${id}`
        );
    }

    async getWithVillages(id) {
        return await this.handlePost(
            `${BASE_URL}/u/member_relations/show_w_villages/${id}`
        );
    }

    async store(
        memberId,
        name,
        family,
        nationalNo,
        identityNo,
        birthDate,
        gender,
        relationshipId,
        description
    ) {
        return await this.handlePost(
            `${BASE_URL}/a/member_relations/store/${memberId}/${relationshipId}`,
            {
                name,
                family,
                national_no: nationalNo,
                identity_no: identityNo,
                birth_date: birthDate,
                gender,
                description,
            }
        );
    }

    async update(
        id,
        name,
        family,
        nationalNo,
        identityNo,
        birthDate,
        gender,
        relationshipId,
        description
    ) {
        return await this.handlePost(
            `${BASE_URL}/a/member_relations/update/${id}/${relationshipId}`,
            {
                name,
                family,
                national_no: nationalNo,
                identity_no: identityNo,
                birth_date: birthDate,
                gender,
                description,
            }
        );
    }

    async transferMemberRelationToNewMember(id, memberId) {
        return await this.handlePost(
            `${BASE_URL}/a/member_relations/transfer_member_relation_to_new_member/${id}/${memberId}`
        );
    }

    async transferMemberToMemberRelation(id, memberId, relationId) {
        return await this.handlePost(
            `${BASE_URL}/a/member_relations/transfer_member_to_member_relation/${id}/${memberId}/${relationId}`
        );
    }

    async delete(id) {
        return await this.handlePost(
            `${BASE_URL}/a/member_relations/delete/${id}`
        );
    }
}
