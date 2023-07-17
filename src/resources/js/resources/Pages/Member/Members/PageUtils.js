import { useForm } from "react-hook-form";

import { Member as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH } from "../../../../constants";
import utils from "../../../../utils/Utils";
import { membersPage as strings } from "../../../../constants/strings/fa";

export class PageUtils extends BasePageUtils {
  constructor() {
    const form = useForm();
    super("Members", strings, form);
    this.entity = new Entity();
    this.initialPageProps = {
      pageNumber: 1,
      item: null,
      items: null,
      villages: null,
      action: null,
    };
  }

  onLoad() {
    super.onLoad();
    this.fillForm();
  }

  onAction(props) {
    switch (props.action) {
      case "SET_PAGE":
        props.action = null;
        this.onSubmit({
          village: this.useForm.getValues("village") ?? "",
          nameFamily: this.useForm.getValues("nameFamily") ?? "",
          nationalNo: this.useForm.getValues("nationalNo") ?? "",
          memberNo: this.useForm.getValues("memberNo") ?? "",
        });

        break;
    }

    super.onAction(props);
  }

  addAction() {
    this.navigate(`${BASE_PATH}/members/add`);
  }

  editAction({ id }) {
    if (utils.isId(id)) {
      this.navigate(`${BASE_PATH}/members/edit/${id}`);
    }
  }

  async fillForm(data = null) {
    let villageId = parseInt(data?.village);
    villageId = isNaN(villageId) ? 0 : villageId;
    let nationalNo = parseInt(data?.nationalNo);
    nationalNo = isNaN(nationalNo) ? 0 : nationalNo;
    let memberNo = parseInt(data?.memberNo);
    memberNo = isNaN(memberNo) ? 0 : memberNo;
    const promise = this.entity.getPaginate(
      villageId,
      data?.nameFamily ?? null,
      nationalNo,
      memberNo,
      this.pageState.props?.pageNumber ?? 1
    );
    super.fillForm(promise);
  }

  propsIfOK(result) {
    try {
      return {
        items: result.items,
        villages: [
          { id: 0, value: strings.allVillages },
          ...result.villages.map((village) => {
            village.value = village.name;
            return village;
          }),
        ],
        itemsCount: result.count,
      };
    } catch {}
  }
}
