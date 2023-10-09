import { useForm } from "react-hook-form";

import { ShareAction as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import {
    BASE_PATH,
    BASE_URL,
    MESSAGE_CODES,
    MESSAGE_TYPES,
} from "../../../../constants";
import utils from "../../../../utils/Utils";
import {
    general,
    shareActionsPage as strings,
} from "../../../../constants/strings/fa";
import { setPageTitleAction } from "../../../../state/page/pageActions";
import { setMessageAction } from "../../../../state/message/messageActions";
import { setShownModalAction } from "../../../../state/layout/layoutActions";

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
            action: null,
        };
        this.handlePromptSubmit = this.handlePromptSubmit.bind(this);
    }

    onLoad() {
        this.navigateIfNotValidateParams();
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

    onRemove(e, item) {
        e.stopPropagation();
        this.promptItem = item;
        this.dispatch(
            setShownModalAction("promptModal", {
                title: strings.removeMessageTitle,
                description: `${item.actionTypeText} - ${item.actionDate}`,
                submitTitle: general.yes,
                cancelTitle: general.no,
                onSubmit: this.handlePromptSubmit,
            })
        );
    }

    addAction() {
        this.navigate(
            `${BASE_PATH}/share_actions/add/${this.pageState?.params?.ownerId}/${this.pageState?.params?.isMember}`
        );
    }

    editAction({ id }) {
        if (utils.isId(id)) {
            this.navigate(`${BASE_PATH}/share_actions/edit/${id}`);
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

    handlePromptSubmit(result) {
        if (result === true) {
            const promise = this.entity.delete(this.promptItem?.id);
            super.onSelfSubmit(promise);
        }
    }

    printPage1() {
        window.open(
            `${BASE_URL}/share_actions/print/page1/${this.pageState?.params?.ownerId}/${this.pageState?.params?.isMember}`
        );
    }

    printPage2() {
        // window.open(
        //     `${BASE_URL}/share_actions/print/page2/${this.pageState?.params?.ownerId}/${this.pageState?.params?.isMember}`
        // );
    }
}
