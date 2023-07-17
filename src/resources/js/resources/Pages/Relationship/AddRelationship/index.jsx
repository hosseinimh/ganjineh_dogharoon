import React from "react";

import { InputTextColumn, FormPage, InputRow } from "../../../components";
import { PageUtils } from "./PageUtils";

const AddRelationship = () => {
  const pageUtils = new PageUtils();

  return (
    <FormPage pageUtils={pageUtils}>
      <InputRow>
        <InputTextColumn field="name" />
      </InputRow>
    </FormPage>
  );
};

export default AddRelationship;
