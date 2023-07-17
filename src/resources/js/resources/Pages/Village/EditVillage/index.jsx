import React from "react";

import {
  InputTextColumn,
  FormPage,
  InputSelectColumn,
  InputRow,
} from "../../../components";
import { PageUtils } from "./PageUtils";
import { districtItems } from "../Villages";

const EditVillage = () => {
  const pageUtils = new PageUtils();

  return (
    <FormPage pageUtils={pageUtils}>
      <InputRow>
        <InputSelectColumn field="district" items={districtItems} showLabel />
        <InputTextColumn field="name" showLabel />
      </InputRow>
    </FormPage>
  );
};

export default EditVillage;
