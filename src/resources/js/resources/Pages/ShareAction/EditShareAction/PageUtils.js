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
            member: null,
        };
        this.callbackUrl = this.pageState?.props?.callbackUrl
            ? this.pageState?.props?.callbackUrl
            : `${BASE_PATH}/members`;
    }

    onLoad() {
        this.navigateIfNotValidateParams();
        super.onLoad();
        this.fillForm(this.pageState.params);
    }

    navigateIfNotValidateParams() {
        this.navigateIfNotValidId(this.pageState?.params?.shareActionId);
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
        return await this.entity.get(id);
    }

    handleFetchResult(result) {
        this.dispatch(
            setPagePropsAction({
                item: result.item,
                member: result.member,
                callbackUrl: `${BASE_PATH}/share_actions/${result?.member?.id}`,
            })
        );
        this.dispatch(
            setPageTitleAction(
                `${strings._title} [ ${result.member.name} ${result.member.family} - ${result.member.nationalNo} ]`,
                strings._subTitle
            )
        );
        this.useForm.setValue("actionDate", result.item.actionDate);
        this.useForm.setValue("actionType", result.item.actionType);
        this.useForm.setValue("count", result.item.count);
        this.useForm.setValue("description", result.item.description);
        this.callbackUrl = `${BASE_PATH}/share_actions/${result?.member?.id}`;
    }

    async onSubmit(data) {
        const promise = this.entity.update(
            this.pageState?.params?.shareActionId,
            data.actionDate.replaceAll("/", ""),
            data.actionType,
            data.count,
            data.description
        );
        super.onModifySubmit(promise);
        this.callbackUrl = `${BASE_PATH}/share_actions/${this.pageState?.props?.member?.id}`;
    }
}
