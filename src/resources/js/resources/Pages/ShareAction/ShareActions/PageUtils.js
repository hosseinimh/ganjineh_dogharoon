import { useForm } from "react-hook-form";

import { ShareAction as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH } from "../../../../constants";
import utils from "../../../../utils/Utils";
import { shareActionsPage as strings } from "../../../../constants/strings/fa";
import { setPageTitleAction } from "../../../../state/page/pageActions";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm();
        super("ShareActions", strings, form);
        this.entity = new Entity();
        this.initialPageProps = {
            pageNumber: 1,
            item: null,
            items: null,
            member: null,
            action: null,
        };
    }

    onLoad() {
        this.navigateIfNotValidateParams();
        super.onLoad();
        this.fillForm();
    }

    navigateIfNotValidateParams() {
        this.navigateIfNotValidId(this.pageState?.params?.memberId);
    }

    addAction() {
        this.navigate(
            `${BASE_PATH}/share_actions/add/${this.pageState?.params?.memberId}`
        );
    }

    editAction({ id }) {
        if (utils.isId(id)) {
            this.navigate(`${BASE_PATH}/share_actions/edit/${id}`);
        }
    }

    async fillForm() {
        const promise = this.entity.getPaginate(
            this.pageState?.params?.memberId,
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
}
