import { useForm } from "react-hook-form";

import { MemberRelation as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH, MESSAGE_TYPES } from "../../../../constants";
import utils from "../../../../utils/Utils";
import {
    general,
    memberRelationsPage as strings,
} from "../../../../constants/strings/fa";
import {
    setPagePropsAction,
    setPageTitleAction,
} from "../../../../state/page/pageActions";
import { setMessageAction } from "../../../../state/message/messageActions";
import { setShownModalAction } from "../../../../state/layout/layoutActions";

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
        this.callbackUrl = `${BASE_PATH}/members`;
        this.handlePromptSubmit = this.handlePromptSubmit.bind(this);
        this.handleTransferMemberRelationToNewMemberSubmit =
            this.handleTransferMemberRelationToNewMemberSubmit.bind(this);
    }

    onLoad() {
        this.navigateIfNotValidateParams();
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

    onShareActions(item) {
        this.navigate(`${BASE_PATH}/share_actions/${item.id}/0`);
    }

    navigateIfNotValidateParams() {
        this.navigateIfNotValidId(this.pageState?.params?.memberId);
    }

    addAction() {
        this.navigate(
            `${BASE_PATH}/member_relations/add/${this.pageState.params.memberId}`
        );
    }

    editAction({ id }) {
        if (utils.isId(id)) {
            this.navigate(`${BASE_PATH}/member_relations/edit/${id}`);
        }
    }

    async fillForm(data) {
        const promise = this.entity.getPaginate(
            data.memberId,
            this.pageState.props?.pageNumber ?? 1
        );
        super.fillForm(promise);
    }

    propsIfOK(result) {
        try {
            this.dispatch(
                setPageTitleAction(
                    `${strings._title} [ ${result.member.name} ${result.member.family} - ${result.member.nationalNo} ]`,
                    strings._subTitle
                )
            );
            return {
                items: result.items,
                member: result.member,
                itemsCount: result.count,
            };
        } catch {}
    }

    handleFetchResultIfNull() {
        this.dispatch(
            setMessageAction(
                this.entity.errorMessage,
                MESSAGE_TYPES.ERROR,
                this.entity.errorCode,
                false
            )
        );
        this.navigate(this.callbackUrl);
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
        this.transferItem = item;
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
            this.fillForm({ memberId: this.transferItem?.memberId });
        }
    }
}
