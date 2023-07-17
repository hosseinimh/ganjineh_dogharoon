import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Country as Entity } from "../../../../http/entities/Country";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH } from "../../../../constants";
import { addCountrySchema as schema } from "../../../validations";
import { addCountryPage as strings } from "../../../../constants/strings/fa";

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
    super.onLoad();
  }

  async onSubmit(data) {
    const promise = this.entity.store(data.name);
    super.onModifySubmit(promise);
  }
}
