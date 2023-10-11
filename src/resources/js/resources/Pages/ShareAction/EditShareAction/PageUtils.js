import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ShareAction as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH } from "../../../../constants";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import { editShareActionSchema as schema } from "../../../validations";
import { editShareActionPage as strings } from "../../../../constants/strings/fa";
import {
    setPagePropsAction,
    setPageTitleAction,
} from "../../../../state/page/pageActions";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm({
            resolver: yupResolver(schema),
        });
        super("ShareActions", strings, form);
        this.entity = new Entity();
        this.initialPageProps = {
            item: null,
            owner: null,
            banks: null,
        };
        this.callbackUrl = `${BASE_PATH}/share_actions/${this.pageState?.props?.item?.ownerId}/${this.pageState?.props?.item?.isMember}`;
    }

    onLoad() {
        this.navigateIfNotValidateParams();
        super.onLoad();
        this.fillForm(this.pageState.params);
    }

    navigateIfNotValidateParams() {
        this.navigateIfNotValidId(this.pageState.params.shareActionId);
    }

    async fillForm(data) {
        try {
            this.dispatch(setLoadingAction(true));
            const result = await this.fetchItem(data.shareActionId);
            this.navigateIfItemNotFound(result);
            this.handleFetchResult(result);
        } catch {
        } finally {
            this.dispatch(setLoadingAction(false));
        }
    }

    async fetchItem(id) {
        return await this.entity.getEditProps(id);
    }

    handleFetchResult(result) {
        this.dispatch(
            setPagePropsAction({
                item: result.item,
                owner: result.owner,
                banks: result.banks.map((bank) => {
                    bank.value = bank.name;
                    return bank;
                }),
            })
        );
        this.dispatch(
            setPageTitleAction(
                `${strings._title} [ ${result.owner.name} ${result.owner.family} - ${result.owner.nationalNo} ] [ ${result.item.actionTypeText} ]`,
                strings._subTitle
            )
        );
        this.useForm.setValue("actionDate", result.item.actionDate);
        this.useForm.setValue("actionType", result.item.actionType);
        this.useForm.setValue("transactionDate", result.item.transactionDate);
        this.useForm.setValue("bank", result.item.bank);
        this.useForm.setValue("invoiceNo", result.item.invoiceNo);
        this.useForm.setValue("price", result.item.price);
        this.useForm.setValue("description", result.item.description);
    }

    async onSubmit(data) {
        const promise = this.entity.update(
            this.pageState?.params?.shareActionId,
            data.transactionDate?.replaceAll("/", ""),
            data.bank ?? null,
            data.invoiceNo,
            data.price ?? 0,
            data.description
        );
        super.onModifySubmit(promise);
    }
}
