import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Member as Entity, Village } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH, MESSAGE_CODES, MESSAGE_TYPES } from "../../../../constants";
import { addMemberSchema as schema } from "../../../validations";
import { addMemberPage as strings } from "../../../../constants/strings/fa";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import { setPagePropsAction } from "../../../../state/page/pageActions";
import { setMessageAction } from "../../../../state/message/messageActions";
import utils from "../../../../utils/Utils";

export class PageUtils extends BasePageUtils {
  constructor() {
    const form = useForm({
      resolver: yupResolver(schema),
    });
    super("Members", strings, form);
    this.entity = new Entity();
    this.initialPageProps = {
      villages: null,
    };
    this.callbackUrl = `${BASE_PATH}/members`;
  }

  onLoad() {
    super.onLoad();
    this.useForm.setValue(
      "birthDate",
      utils.toNumericLocaleDateString(Date.now())
    );
    this.useForm.setValue(
      "membershipDate",
      utils.toNumericLocaleDateString(Date.now())
    );
    this.fetchVillages();
  }

  async fetchVillages() {
    this.dispatch(setLoadingAction(true));
    const village = new Village();
    const result = await village.getAll();
    this.dispatch(setLoadingAction(false));
    if (result) {
      if (result.items.length > 0) {
        this.dispatch(
          setPagePropsAction({
            villages: result.items.map((village) => {
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
    } else {
      this.dispatch(setPagePropsAction(this.initialPageProps));
    }
  }

  async onSubmit(data) {
    const promise = this.entity.store(
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
