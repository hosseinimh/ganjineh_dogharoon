import { useForm } from "react-hook-form";

import { Village as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH, DISTRICT } from "../../../../constants";
import utils from "../../../../utils/Utils";
import { villagesPage as strings } from "../../../../constants/strings/fa";
import { setPagePropsAction } from "../../../../state/page/pageActions";

export class PageUtils extends BasePageUtils {
  constructor() {
    const form = useForm();
    super("Villages", strings, form);
    this.entity = new Entity();
    this.initialPageProps = {
      pageNumber: 1,
      item: null,
      items: null,
      itemsCount: 0,
      districtId: DISTRICT.ALL,
      action: null,
    };
  }

  onLoad() {
    super.onLoad();
    this.fillForm();
  }

  onChangeDistrict(districtId) {
    this.dispatch(
      setPagePropsAction({
        action: "CHANGE_DISTRICT",
        districtId,
      })
    );
  }

  onAction(props) {
    switch (props.action) {
      case "CHANGE_DISTRICT":
        props.action = null;
        this.onSubmit();
        break;
    }
    super.onAction(props);
  }

  addAction() {
    this.navigate(`${BASE_PATH}/villages/add`);
  }

  editAction({ id }) {
    if (utils.isId(id)) {
      this.navigate(`${BASE_PATH}/villages/edit/${id}`);
    }
  }

  async fillForm() {
    const promise = this.entity.getPaginate(
      this.pageState.props.districtId,
      this.pageState.props?.pageNumber ?? 1
    );
    super.fillForm(promise);
  }
}
