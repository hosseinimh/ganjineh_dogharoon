import React from "react";

import {
  InputTextColumn,
  FormPage,
  InputSelectColumn,
  InputRow,
} from "../../../components";
import { PageUtils } from "./PageUtils";
import { districtItems } from "../Villages";

const AddVillage = () => {
  const pageUtils = new PageUtils();

  return (
    <FormPage pageUtils={pageUtils}>
      <InputRow>
        <InputSelectColumn field="district" items={districtItems} />
        <InputTextColumn field="name" />
      </InputRow>
    </FormPage>
  );
};

export default AddVillage;
