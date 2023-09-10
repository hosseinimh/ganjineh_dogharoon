import { useForm } from "react-hook-form";

import { MemberRelation as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH } from "../../../../constants";
import utils from "../../../../utils/Utils";
import { memberRelationsAllPage as strings } from "../../../../constants/strings/fa";

export class PageUtils extends BasePageUtils {
  constructor() {
    const form = useForm();
    super("MemberRelations", strings, form);
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
    this.fillForm(this.pageState.params);
  }

  editAction({ id }) {
    if (utils.isId(id)) {
      this.navigate(`${BASE_PATH}/member_relations/edit/${id}`);
    }
  }

  transferToMemberAction({ id }) {
    if (utils.isId(id)) {
      this.navigate(
        `${BASE_PATH}/transfer/change_member_relation_to_member/${id}`
      );
    }
  }

  async fillForm() {
    const promise = this.entity.getAll(this.pageState.props?.pageNumber ?? 1);
    super.fillForm(promise);
  }
}
