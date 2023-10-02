import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { MemberRelation as Entity, Member } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH, MESSAGE_CODES, MESSAGE_TYPES } from "../../../../constants";
import { addMemberRelationSchema as schema } from "../../../validations";
import { addMemberRelationPage as strings } from "../../../../constants/strings/fa";
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
        super("MemberRelations", strings, form);
        this.entity = new Entity();
        this.initialPageProps = {
            relationships: null,
        };
        this.callbackUrl = `${BASE_PATH}/member_relations/${this.pageState?.params?.memberId}`;
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
        return await member.getWithRelationships(id);
    }

    handleFetchResult(result) {
        if (result.relationships.length > 0) {
            this.dispatch(
                setPagePropsAction({
                    relationships: result.relationships.map((relationship) => {
                        relationship.value = relationship.name;
                        return relationship;
                    }),
                })
            );
        } else {
            this.dispatch(
                setMessageAction(
                    strings.noRelationshipsFound,
                    MESSAGE_TYPES.ERROR,
                    MESSAGE_CODES.ITEM_NOT_FOUND
                )
            );
        }
        this.dispatch(
            setPageTitleAction(
                `${strings._title} [ ${result.item.name} ${result.item.family} - ${result.item.nationalNo} ]`,
                strings._subTitle
            )
        );
        this.useForm.setValue(
            "birthDate",
            utils.toNumericLocaleDateString(Date.now())
        );
    }

    async onSubmit(data) {
        const promise = this.entity.store(
            this.pageState.params.memberId,
            data.name,
            data.family,
            data.nationalNo,
            data.identityNo,
            data.birthDate.replaceAll("/", ""),
            data.gender,
            data.relationship,
            data.description
        );
        super.onModifySubmit(promise);
    }
}
