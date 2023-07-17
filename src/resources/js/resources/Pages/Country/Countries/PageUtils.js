import { useForm } from "react-hook-form";

import { Country as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH } from "../../../../constants";
import utils from "../../../../utils/Utils";
import { countriesPage as strings } from "../../../../constants/strings/fa";

export class PageUtils extends BasePageUtils {
  constructor() {
    const form = useForm();
    super("Countries", strings, form);
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
    this.navigate(`${BASE_PATH}/countries/add`);
  }

  editAction({ id }) {
    if (utils.isId(id)) {
      this.navigate(`${BASE_PATH}/countries/edit/${id}`);
    }
  }

  async fillForm() {
    const promise = this.entity.getPaginate(
      this.pageState.props?.pageNumber ?? 1
    );
    super.fillForm(promise);
  }
}
