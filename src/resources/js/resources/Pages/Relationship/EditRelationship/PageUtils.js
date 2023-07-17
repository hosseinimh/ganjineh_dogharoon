import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Relationship as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH } from "../../../../constants";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import { editRelationshipSchema as schema } from "../../../validations";
import { editRelationshipPage as strings } from "../../../../constants/strings/fa";

export class PageUtils extends BasePageUtils {
  constructor() {
    const form = useForm({
      resolver: yupResolver(schema),
    });
    super("Relationships", strings, form);
    this.entity = new Entity();
    this.callbackUrl = `${BASE_PATH}/relationships`;
  }

  onLoad() {
    this.navigateIfNotValidateParams();
    super.onLoad();
    this.fillForm(this.pageState.params);
  }

  navigateIfNotValidateParams() {
    this.navigateIfNotValidId(this.pageState.params.relationshipId);
  }

  async fillForm(data) {
    try {
      this.dispatch(setLoadingAction(true));
      const result = await this.fetchItem(data.relationshipId);
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
    this.useForm.setValue("name", result.item.name);
  }

  async onSubmit(data) {
    const promise = this.entity.update(
      this.pageState.params.relationshipId,
      data.name
    );
    super.onModifySubmit(promise);
  }
}
