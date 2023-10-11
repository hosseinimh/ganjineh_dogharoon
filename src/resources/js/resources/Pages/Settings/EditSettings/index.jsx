import React from "react";

import { InputTextColumn, FormPage, InputRow } from "../../../components";
import { PageUtils } from "./PageUtils";

const EditSettings = () => {
    const pageUtils = new PageUtils();

    return (
        <FormPage pageUtils={pageUtils}>
            <InputRow>
                <InputTextColumn
                    field="companyName"
                    showLabel
                    fullRow={false}
                />
                <InputTextColumn field="serialNo" showLabel fullRow={false} />
            </InputRow>
            <InputRow>
                <InputTextColumn
                    field="registryBookNo"
                    showLabel
                    fullRow={false}
                />
                <InputTextColumn field="registerNo" showLabel fullRow={false} />
            </InputRow>
        </FormPage>
    );
};

export default EditSettings;
