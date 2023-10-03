import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ShareAction as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH, MESSAGE_CODES, MESSAGE_TYPES } from "../../../../constants";
import { addShareActionSchema as schema } from "../../../validations";
import {
    general,
    addShareActionPage as strings,
} from "../../../../constants/strings/fa";
import utils from "../../../../utils/Utils";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import {
    setPagePropsAction,
    setPageTitleAction,
} from "../../../../state/page/pageActions";
import { setMessageAction } from "../../../../state/message/messageActions";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm({
            resolver: yupResolver(schema),
        });
        super("ShareActions", strings, form);
        this.entity = new Entity();
        this.initialPageProps = {
            owner: null,
            banks: null,
        };
        this.callbackUrl = `${BASE_PATH}/share_actions/${this.pageState?.params?.ownerId}/${this.pageState?.params?.isMember}`;
    }

    onLoad() {
        this.navigateIfNotValidateParams();
        super.onLoad();
        this.fillForm(this.pageState.params);
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

    async fillForm(data) {
        try {
            this.dispatch(setLoadingAction(true));
            const result = await this.fetchProps(data.ownerId, data.isMember);
            this.navigateIfItemNotFound(result);
            this.handleFetchResult(result);
        } catch {
        } finally {
            this.dispatch(setLoadingAction(false));
        }
    }

    async fetchProps(ownerId, isMember) {
        return await this.entity.getAddProps(ownerId, isMember);
    }

    handleFetchResult(result) {
        this.dispatch(
            setPageTitleAction(
                `${strings._title} [ ${result.owner.name} ${result.owner.family} - ${result.owner.nationalNo} ]`,
                strings._subTitle
            )
        );
        this.dispatch(
            setPagePropsAction({
                owner: result.owner,
                banks: result.banks.map((bank) => {
                    bank.value = bank.name;
                    return bank;
                }),
            })
        );
        this.useForm.setValue(
            "actionDate",
            utils.toNumericLocaleDateString(Date.now())
        );
    }

    async onSubmit(data) {
        const promise = this.entity.store(
            this.pageState?.params?.ownerId,
            this.pageState?.params?.isMember,
            data.actionDate.replaceAll("/", ""),
            data.actionType,
            data.transactionDate?.replaceAll("/", ""),
            data.bank ?? null,
            data.invoiceNo,
            data.price ?? 0,
            data.description
        );
        super.onModifySubmit(promise);
    }
}
