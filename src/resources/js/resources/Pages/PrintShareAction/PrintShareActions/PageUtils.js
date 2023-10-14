import { useForm } from "react-hook-form";

import { PrintShareAction as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { MESSAGE_CODES, MESSAGE_TYPES } from "../../../../constants";
import {
    general,
    printShareActionsPage as strings,
} from "../../../../constants/strings/fa";
import {
    setPageAction,
    setPageTitleAction,
} from "../../../../state/page/pageActions";
import { setMessageAction } from "../../../../state/message/messageActions";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm();
        super("ShareActions", strings, form);
        this.entity = new Entity();
        this.initialPageProps = {
            pageNumber: 1,
            item: null,
            items: null,
            owner: null,
        };
    }

    onLoad() {
        this.navigateIfNotValidateParams();
        this.dispatch(
            setPageAction(
                this.pageState?.params?.isMember ? "Members" : "MemberRelations"
            )
        );
        super.onLoad();
        this.fillForm();
    }

    navigateIfNotValidateParams() {
        this.navigateIfNotValidId(this.pageState?.params?.ownerId);
        const isMember = parseInt(this.pageState?.params?.isMember);
        if (isNaN(isMember) || ![0, 1].includes(isMember)) {
            this.dispatch(
                setMessageAction(
                    general.itemNotFound,
                    MESSAGE_TYPES.ERROR,
                    MESSAGE_CODES.ITEM_NOT_FOUND,
                    false
                )
            );
            this.navigate(this.callbackUrl);
        }
    }

    async fillForm() {
        const promise = this.entity.getPaginate(
            this.pageState?.params?.ownerId,
            this.pageState?.params?.isMember,
            this.pageState.props?.pageNumber ?? 1
        );
        super.fillForm(promise);
    }

    propsIfOK(result) {
        try {
            this.dispatch(
                setPageTitleAction(
                    `${strings._title} [ ${result.owner.name} ${result.owner.family} - ${result.owner.nationalNo} ]`,
                    strings._subTitle
                )
            );
            return {
                items: result.items,
                owner: result.owner,
                itemsCount: result.count,
            };
        } catch {}
    }
}
