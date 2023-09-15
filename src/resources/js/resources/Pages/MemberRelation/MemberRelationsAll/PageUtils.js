import { useForm } from "react-hook-form";

import { MemberRelation as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH } from "../../../../constants";
import utils from "../../../../utils/Utils";
import {
    general,
    memberRelationsAllPage as strings,
} from "../../../../constants/strings/fa";
import { setShownModalAction } from "../../../../state/layout/layoutActions";
import { setPagePropsAction } from "../../../../state/page/pageActions";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm();
        super("MemberRelations", strings, form);
        this.entity = new Entity();
        this.initialPageProps = {
            pageNumber: 1,
            item: null,
            items: null,
            action: null,
        };
        this.handlePromptSubmit = this.handlePromptSubmit.bind(this);
        this.handleTransferMemberRelationToNewMemberSubmit =
            this.handleTransferMemberRelationToNewMemberSubmit.bind(this);
    }

    onLoad() {
        super.onLoad();
        this.fillForm(this.pageState.params);
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

    editAction({ id }) {
        if (utils.isId(id)) {
            this.navigate(`${BASE_PATH}/member_relations/edit/${id}`);
        }
    }

    async fillForm(data = null) {
        let villageId = parseInt(data?.village);
        villageId = isNaN(villageId) ? 0 : villageId;
        let nationalNo = parseInt(data?.nationalNo);
        nationalNo =
            isNaN(nationalNo) || nationalNo < 0 ? null : data?.nationalNo;
        let cardNo = parseInt(data?.cardNo);
        cardNo = isNaN(cardNo) || cardNo < 0 ? 0 : cardNo;
        const promise = this.entity.getAll(
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
            };
        } catch {}
    }

    transferMemberRelationToMemberAction({ id }) {
        if (utils.isId(id)) {
            this.navigate(
                `${BASE_PATH}/member/transfer_member_relation_to_member/${id}`
            );
        }
    }

    handlePromptSubmit(result) {
        if (result === true) {
            const promise = this.entity.delete(this.promptItem?.id);
            super.onSelfSubmit(promise);
        }
    }

    transferMemberRelationToNewMemberModal(e, item) {
        e.stopPropagation();
        this.dispatch(
            setShownModalAction("transferMemberRelationToNewMemberModal", {
                memberRelation: item,
                onSubmit: this.handleTransferMemberRelationToNewMemberSubmit,
            })
        );
    }

    handleTransferMemberRelationToNewMemberSubmit(result) {
        if (result === true) {
            this.dispatch(setPagePropsAction(this.initialPageProps));
            this.fillForm();
        }
    }
}
