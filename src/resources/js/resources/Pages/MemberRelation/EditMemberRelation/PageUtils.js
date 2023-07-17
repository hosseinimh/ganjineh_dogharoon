import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { MemberRelation as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH, MESSAGE_CODES, MESSAGE_TYPES } from "../../../../constants";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import { editMemberRelationSchema as schema } from "../../../validations";
import { editMemberRelationPage as strings } from "../../../../constants/strings/fa";
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
    super("Members", strings, form);
    this.entity = new Entity();
    this.initialPageProps = {
      item: null,
      member: null,
      relationships: null,
    };
    this.callbackUrl = `${BASE_PATH}/member_relations/${this.pageState?.props?.member?.id}`;
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
    return await this.entity.getWithRelationships(id);
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
      setPagePropsAction({ item: result.item, member: result.member })
    );
    this.dispatch(
      setPageTitleAction(
        `${strings._title} [ ${result.member.name} ${result.member.family} - ${result.member.nationalNo} ]`,
        strings._subTitle
      )
    );
    this.useForm.setValue("name", result.item.name);
    this.useForm.setValue("family", result.item.family);
    this.useForm.setValue("nationalNo", result.item.nationalNo);
    this.useForm.setValue("identityNo", result.item.identityNo);
    this.useForm.setValue("birthDate", result.item.birthDate);
    this.useForm.setValue("postalCode", result.item.postalCode);
    this.useForm.setValue("gender", result.item.gender);
    this.useForm.setValue("relationship", result.item.relationshipId);
    this.useForm.setValue("description", result.item.description);
  }

  async onSubmit(data) {
    const promise = this.entity.update(
      this.pageState.params.memberRelationId,
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
