import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Member, MemberRelation as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH, MESSAGE_CODES, MESSAGE_TYPES } from "../../../../constants";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import { editMemberSchema as schema } from "../../../validations";
import { changeMemberRelationToMemberPage as strings } from "../../../../constants/strings/fa";
import { setPagePropsAction } from "../../../../state/page/pageActions";
import { setMessageAction } from "../../../../state/message/messageActions";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm({
            resolver: yupResolver(schema),
        });
        super("MemberRelations", strings, form);
        this.entity = new Entity();
        this.initialPageProps = {
            item: null,
            villages: null,
            maxCardNo: 0,
        };
        this.callbackUrl = `${BASE_PATH}/members`;
    }

    onLoad() {
        this.navigateIfNotValidateParams();
        super.onLoad();
        this.fillForm(this.pageState.params);
    }

    navigateIfNotValidateParams() {
        this.navigateIfNotValidId(this.pageState.params.memberRelationId);
    }

    async fillForm(data) {
        try {
            this.dispatch(setLoadingAction(true));
            const result = await this.fetchItem(data.memberRelationId);
            this.navigateIfItemNotFound(result);
            this.handleFetchResult(result);
        } catch {
        } finally {
            this.dispatch(setLoadingAction(false));
        }
    }

    async fetchItem(id) {
        return await this.entity.getWithVillages(id);
    }

    handleFetchResult(result) {
        if (result.villages.length > 0) {
            this.dispatch(
                setPagePropsAction({
                    villages: result.villages.map((village) => {
                        village.value = village.name;
                        return village;
                    }),
                })
            );
        } else {
            this.dispatch(
                setMessageAction(
                    strings.noVillagesFound,
                    MESSAGE_TYPES.ERROR,
                    MESSAGE_CODES.ITEM_NOT_FOUND
                )
            );
        }
        this.dispatch(
            setPagePropsAction({
                item: result.item,
                maxCardNo: result.maxCardNo,
            })
        );
        this.useForm.setValue("name", result.item.name);
        this.useForm.setValue("family", result.item.family);
        this.useForm.setValue("nationalNo", result.item.nationalNo);
        this.useForm.setValue("identityNo", result.item.identityNo);
        this.useForm.setValue("fatherName", result.item.fatherName);
        this.useForm.setValue("birthDate", result.item.birthDate);
        this.useForm.setValue("membershipDate", result.item.membershipDate);
        this.useForm.setValue("postalCode", result.item.postalCode);
        this.useForm.setValue("gender", result.item.gender);
        this.useForm.setValue("village", result.item.villageId);
        this.useForm.setValue("tel", result.item.tel);
        this.useForm.setValue("mobile", result.item.mobile);
        this.useForm.setValue("address", result.item.address);
        this.useForm.setValue("description", result.item.description);
        this.useForm.setValue("cardNo", result.maxCardNo + 1);
    }

    async onSubmit(data) {
        const member = new Member();
        const promise = member.changeMemberRelationToMemnber(
            this.pageState.params.memberRelationId,
            data.name,
            data.family,
            data.nationalNo,
            data.identityNo,
            data.fatherName,
            data.birthDate.replaceAll("/", ""),
            data.membershipDate.replaceAll("/", ""),
            data.postalCode,
            data.gender,
            data.village,
            data.tel,
            data.mobile,
            data.address,
            data.description,
            data.cardNo
        );
        super.onModifySubmit(promise);
    }
}
