import { useForm } from "react-hook-form";

import { Bank as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH } from "../../../../constants";
import utils from "../../../../utils/Utils";
import { banksPage as strings } from "../../../../constants/strings/fa";

export class PageUtils extends BasePageUtils {
  constructor() {
    const form = useForm();
    super("Banks", strings, form);
    this.entity = new Entity();
    this.initialPageProps = {
      pageNumber: 1,
      item: null,
      items: null,
      action: null,
    };
  }

  onLoad() {
    super.onLoad();
    this.fillForm();
  }

  addAction() {
    this.navigate(`${BASE_PATH}/banks/add`);
  }

  editAction({ id }) {
    if (utils.isId(id)) {
      this.navigate(`${BASE_PATH}/banks/edit/${id}`);
    }
  }

  async fillForm() {
    const promise = this.entity.getPaginate(
      this.pageState.props?.pageNumber ?? 1
    );
    super.fillForm(promise);
  }
}
