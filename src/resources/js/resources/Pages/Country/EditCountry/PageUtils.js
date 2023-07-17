import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Country as Entity } from "../../../../http/entities/Country";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH } from "../../../../constants";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import { editCountrySchema as schema } from "../../../validations";
import { editCountryPage as strings } from "../../../../constants/strings/fa";

export class PageUtils extends BasePageUtils {
  constructor() {
    const form = useForm({
      resolver: yupResolver(schema),
    });
    super("Countries", strings, form);
    this.entity = new Entity();
    this.callbackUrl = `${BASE_PATH}/countries`;
  }

  onLoad() {
    this.navigateIfNotValidateParams();
    super.onLoad();
    this.fillForm(this.pageState.params);
  }

  navigateIfNotValidateParams() {
    this.navigateIfNotValidId(this.pageState.params.countryId);
  }

  async fillForm(data) {
    try {
      this.dispatch(setLoadingAction(true));
      const result = await this.fetchItem(data.countryId);
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
      this.pageState.params.countryId,
      data.name
    );
    super.onModifySubmit(promise);
  }
}
