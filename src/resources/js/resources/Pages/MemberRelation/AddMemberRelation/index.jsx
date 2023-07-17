import React from "react";

import {
  InputTextColumn,
  FormPage,
  InputRow,
  InputDatePickerColumn,
  InputSelectColumn,
} from "../../../components";
import { PageUtils } from "./PageUtils";
import { types } from "../../Member/Members";

const AddMemberRelation = () => {
  const pageUtils = new PageUtils();

  return (
    <FormPage pageUtils={pageUtils}>
      <InputRow>
        <InputTextColumn
          field="name"
          fullRow={false}
          icon={"icon-personalcard4"}
        />
        <InputTextColumn
          field="family"
          fullRow={false}
          icon={"icon-personalcard4"}
        />
        <InputTextColumn
          field="nationalNo"
          fullRow={false}
          icon={"icon-personalcard4"}
        />
        <InputTextColumn
          field="identityNo"
          fullRow={false}
          type="number"
          icon={"icon-personalcard4"}
        />
      </InputRow>
      <InputRow>
        <InputDatePickerColumn field="birthDate" fullRow={false} />
        <InputSelectColumn field="gender" items={types} fullRow={false} />
        <InputSelectColumn
          field="relationship"
          items={pageUtils?.pageState?.props?.relationships}
          fullRow={false}
        />
      </InputRow>
      <InputTextColumn field="description" icon={"icon-edit-24"} />
    </FormPage>
  );
};

export default AddMemberRelation;
