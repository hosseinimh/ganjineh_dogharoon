import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Relationship as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH } from "../../../../constants";
import { addRelationshipSchema as schema } from "../../../validations";
import { addRelationshipPage as strings } from "../../../../constants/strings/fa";

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
    super.onLoad();
  }

  async onSubmit(data) {
    const promise = this.entity.store(data.name);
    super.onModifySubmit(promise);
  }
}
