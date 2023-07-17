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
import { editMemberRelationPage as strings } from "../../../../constants/strings/fa";

const EditMemberRelation = () => {
  const pageUtils = new PageUtils();

  return (
    <FormPage pageUtils={pageUtils}>
      <InputRow>
        <InputTextColumn
          field="name"
          fullRow={false}
          showLabel
          icon={"icon-personalcard4"}
        />
        <InputTextColumn
          field="family"
          fullRow={false}
          showLabel
          icon={"icon-personalcard4"}
        />
        <InputTextColumn
          field="nationalNo"
          fullRow={false}
          showLabel
          icon={"icon-personalcard4"}
        />
        <InputTextColumn
          field="identityNo"
          fullRow={false}
          type="number"
          showLabel
          icon={"icon-personalcard4"}
        />
      </InputRow>
      <InputRow>
        <InputDatePickerColumn field="birthDate" fullRow={false} showLabel />
        <InputSelectColumn
          field="gender"
          items={types}
          fullRow={false}
          showLabel
        />
        <InputSelectColumn
          field="relationship"
          items={pageUtils?.pageState?.props?.relationships}
          fullRow={false}
          showLabel
        />
      </InputRow>
      <InputRow containerStyle={{ marginBottom: "2rem" }}>
        <span style={{ marginLeft: "1rem" }}>{strings.birthDate}:</span>
        <span className="text">
          {pageUtils?.pageState?.props?.item?.birthDate}
        </span>
      </InputRow>
      <InputTextColumn field="description" showLabel icon={"icon-edit-24"} />
    </FormPage>
  );
};

export default EditMemberRelation;
