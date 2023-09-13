import { useForm } from "react-hook-form";

import { MemberRelation as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH, MESSAGE_TYPES } from "../../../../constants";
import utils from "../../../../utils/Utils";
import { memberRelationsPage as strings } from "../../../../constants/strings/fa";
import {
    setPagePropsAction,
    setPageTitleAction,
} from "../../../../state/page/pageActions";
import { setMessageAction } from "../../../../state/message/messageActions";
import { setShownModalAction } from "../../../../state/layout/layoutActions";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm();
        super("Members", strings, form);
        this.entity = new Entity();
        this.initialPageProps = {
            pageNumber: 1,
            item: null,
            items: null,
            action: null,
        };
        this.callbackUrl = `${BASE_PATH}/members`;
    }

    onLoad() {
        this.navigateIfNotValidateParams();
        super.onLoad();
        this.fillForm(this.pageState.params);
    }

    navigateIfNotValidateParams() {
        this.navigateIfNotValidId(this.pageState.params.memberId);
    }

    addAction() {
        this.navigate(
            `${BASE_PATH}/member_relations/add/${this.pageState.params.memberId}`
        );
    }

    editAction({ id }) {
        console.log(`${BASE_PATH}/member_relations/edit/${id}`);
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

    transferToMemberAction({ id }) {
        if (utils.isId(id)) {
            this.navigate(
                `${BASE_PATH}/transfer/change_member_relation_to_member/${id}`
            );
        }
    }

    showTransferToNewMemberModal(e, item) {
        e.stopPropagation();
        this.dispatch(
            setShownModalAction("transferToNewMemberModal", {
                memberRelation: item,
                onCloseModal: this.onCloseModal,
            })
        );
    }

    onCloseModal(result) {
        if (result === true) {
            this.dispatch(setPagePropsAction(this.initialPageProps));
            this.fillForm();
        }
    }
}
