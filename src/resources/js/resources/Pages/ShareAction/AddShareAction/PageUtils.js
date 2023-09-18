import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ShareAction as Entity, Member } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH } from "../../../../constants";
import { addShareActionSchema as schema } from "../../../validations";
import { addShareActionPage as strings } from "../../../../constants/strings/fa";
import utils from "../../../../utils/Utils";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import { setPageTitleAction } from "../../../../state/page/pageActions";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm({
            resolver: yupResolver(schema),
        });
        super("ShareActions", strings, form);
        this.entity = new Entity();
        this.callbackUrl = `${BASE_PATH}/share_actions/${this.pageState?.params?.memberId}`;
    }

    onLoad() {
        this.navigateIfNotValidateParams();
        super.onLoad();
        this.fillForm(this.pageState.params);
    }

    navigateIfNotValidateParams() {
        this.navigateIfNotValidId(this.pageState?.params?.memberId);
    }

    async fillForm(data) {
        try {
            this.dispatch(setLoadingAction(true));
            const result = await this.fetchMember(data.memberId);
            this.navigateIfItemNotFound(result);
            this.handleFetchResult(result);
        } catch {
        } finally {
            this.dispatch(setLoadingAction(false));
        }
    }

    async fetchMember(id) {
        const member = new Member();
        return await member.get(id);
    }

    handleFetchResult(result) {
        this.dispatch(
            setPageTitleAction(
                `${strings._title} [ ${result.item.name} ${result.item.family} - ${result.item.nationalNo} ]`,
                strings._subTitle
            )
        );
        this.useForm.setValue(
            "actionDate",
            utils.toNumericLocaleDateString(Date.now())
        );
    }

    async onSubmit(data) {
        const promise = this.entity.store(
            this.pageState?.params?.memberId,
            data.actionDate.replaceAll("/", ""),
            data.actionType,
            data.count,
            data.description
        );
        super.onModifySubmit(promise);
    }
}
