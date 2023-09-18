import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Member as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH, BASE_URL } from "../../../../constants";
import utils from "../../../../utils/Utils";
import {
    general,
    membersPage as strings,
} from "../../../../constants/strings/fa";
import { searchMemberSchema as schema } from "../../../validations";
import { setShownModalAction } from "../../../../state/layout/layoutActions";
import { setPagePropsAction } from "../../../../state/page/pageActions";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm({
            resolver: yupResolver(schema),
        });
        super("Members", strings, form);
        this.entity = new Entity();
        this.initialPageProps = {
            pageNumber: 1,
            item: null,
            items: null,
            villages: null,
            relationships: null,
            action: null,
        };
        this.handlePromptSubmit = this.handlePromptSubmit.bind(this);
        this.handleTransferMemberToMemberRelationSubmit =
            this.handleTransferMemberToMemberRelationSubmit.bind(this);
    }

    onLoad() {
        super.onLoad();
        this.fillForm();
    }

    onAction(props) {
        switch (props.action) {
            case "SET_PAGE":
                props.action = null;
                this.onSubmit({
                    village: this.useForm.getValues("village") ?? "",
                    name: this.useForm.getValues("name") ?? "",
                    family: this.useForm.getValues("family") ?? "",
                    nationalNo: this.useForm.getValues("nationalNo") ?? null,
                    cardNo: this.useForm.getValues("cardNo") ?? 0,
                });

                break;
        }

        super.onAction(props);
    }

    onRemove(e, item) {
        e.stopPropagation();
        this.promptItem = item;
        this.dispatch(
            setShownModalAction("promptModal", {
                title: strings.removeMessageTitle,
                description: `${item.name} ${item.family} - ${item.nationalNo}`,
                submitTitle: general.yes,
                cancelTitle: general.no,
                onSubmit: this.handlePromptSubmit,
            })
        );
    }

    onMemberRelations(item) {
        this.navigate(`${BASE_PATH}/member_relations/${item.id}`);
    }

    onShareActions(item) {
        this.navigate(`${BASE_PATH}/share_actions/${item.id}`);
    }

    addAction() {
        this.navigate(`${BASE_PATH}/members/add`);
    }

    editAction({ id }) {
        if (utils.isId(id)) {
            this.navigate(`${BASE_PATH}/members/edit/${id}`);
        }
    }

    printWithMobileAction() {
        this.handlePrintAction(true);
    }

    printWitouthMobileAction() {
        this.handlePrintAction(false);
    }

    handlePrintAction(showMobile = false) {
        let villageId = this.useForm.getValues("village") ?? "";
        villageId = parseInt(villageId);
        villageId = isNaN(villageId) ? 0 : villageId;
        let name = this.useForm.getValues("name") ?? "";
        let family = this.useForm.getValues("family") ?? "";
        let nationalNo = this.useForm.getValues("nationalNo") ?? 0;
        nationalNo = parseInt(nationalNo);
        nationalNo = isNaN(nationalNo) || nationalNo < 0 ? 0 : nationalNo;
        let cardNo = this.useForm.getValues("cardNo") ?? 0;
        cardNo = parseInt(cardNo);
        cardNo = isNaN(cardNo) || cardNo < 0 ? 0 : cardNo;
        let mobile = showMobile ? 1 : 0;
        window.open(
            `${BASE_URL}/members/print/?village_id=${villageId}&name=${name}&family=${family}&national_no=${nationalNo}&card_no=${cardNo}&mobile=${mobile}`
        );
    }

    async fillForm(data = null) {
        let villageId = parseInt(data?.village);
        villageId = isNaN(villageId) ? 0 : villageId;
        let nationalNo = parseInt(data?.nationalNo);
        nationalNo =
            isNaN(nationalNo) || nationalNo < 0 ? null : data?.nationalNo;
        let cardNo = parseInt(data?.cardNo);
        cardNo = isNaN(cardNo) || cardNo < 0 ? 0 : cardNo;
        const promise = this.entity.getPaginate(
            villageId,
            data?.name ?? null,
            data?.family ?? null,
            nationalNo,
            cardNo,
            this.pageState.props?.pageNumber ?? 1
        );
        super.fillForm(promise);
    }

    propsIfOK(result) {
        try {
            return {
                items: result.items,
                villages: [
                    { id: 0, value: strings.allVillages },
                    ...result.villages.map((village) => {
                        village.value = village.name;
                        return village;
                    }),
                ],
                itemsCount: result.count,
                memberRelationsCount: result.memberRelationsCount,
                relationships: result.relationships
                    ? [
                          ...result.relationships.map((relationship) => {
                              relationship.value = relationship.name;
                              return relationship;
                          }),
                      ]
                    : this.pageState?.props?.relationships,
            };
        } catch {}
    }

    transferMemberToMemberRelationModal(e, item) {
        e.stopPropagation();
        this.dispatch(
            setShownModalAction("transferMemberToMemberRelationModal", {
                member: item,
                relationships: this.pageState?.props?.relationships,
                onSubmit: this.handleTransferMemberToMemberRelationSubmit,
            })
        );
    }

    handlePromptSubmit(result) {
        if (result === true) {
            const promise = this.entity.delete(this.promptItem?.id);
            super.onSelfSubmit(promise);
        }
    }

    handleTransferMemberToMemberRelationSubmit(result) {
        if (result === true) {
            this.dispatch(setPagePropsAction(this.initialPageProps));
            this.fillForm();
        }
    }
}
