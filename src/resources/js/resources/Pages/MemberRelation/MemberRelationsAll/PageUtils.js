import { useForm } from "react-hook-form";

import { MemberRelation as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH } from "../../../../constants";
import utils from "../../../../utils/Utils";
import { memberRelationsAllPage as strings } from "../../../../constants/strings/fa";
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
        this.onCloseModal = this.onCloseModal.bind(this);
    }

    onLoad() {
        super.onLoad();
        this.fillForm(this.pageState.params);
    }

    editAction({ id }) {
        if (utils.isId(id)) {
            this.navigate(`${BASE_PATH}/member_relations/edit/${id}`);
        }
    }

    async fillForm() {
        const promise = this.entity.getAll(
            this.pageState.props?.pageNumber ?? 1
        );
        super.fillForm(promise);
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
