import React from "react";

import { InputTextColumn, FormPage, InputRow } from "../../../components";
import { PageUtils } from "./PageUtils";

const EditBank = () => {
  const pageUtils = new PageUtils();

  return (
    <FormPage pageUtils={pageUtils}>
      <InputRow>
        <InputTextColumn field="name" showLabel />
      </InputRow>
    </FormPage>
  );
};

export default EditBank;
