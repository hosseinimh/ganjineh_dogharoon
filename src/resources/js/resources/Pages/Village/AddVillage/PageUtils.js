import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Village as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH } from "../../../../constants";
import { addVillageSchema as schema } from "../../../validations";
import { addVillagePage as strings } from "../../../../constants/strings/fa";

export class PageUtils extends BasePageUtils {
  constructor() {
    const form = useForm({
      resolver: yupResolver(schema),
    });
    super("Villages", strings, form);
    this.entity = new Entity();
    this.callbackUrl = `${BASE_PATH}/villages`;
  }

  onLoad() {
    super.onLoad();
  }

  async onSubmit(data) {
    const promise = this.entity.store(data.district, data.name);
    super.onModifySubmit(promise);
  }
}
