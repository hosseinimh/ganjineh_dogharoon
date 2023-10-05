import React from "react";

import {
    InputTextColumn,
    FormPage,
    InputRow,
    InputDatePickerColumn,
    InputSelectColumn,
} from "../../../components";
import { PageUtils } from "./PageUtils";
import { types } from "../ShareActions";

const EditShareAction = () => {
    const pageUtils = new PageUtils();

    return (
        <FormPage pageUtils={pageUtils}>
            <InputRow>
                <InputDatePickerColumn
                    field="actionDate"
                    showLabel
                    fullRow={false}
                    readOnly
                />
                <InputSelectColumn
                    field="actionType"
                    showLabel
                    items={types}
                    fullRow={false}
                    readOnly
                />
                <div></div>
                <div></div>
            </InputRow>
            <InputRow>
                <InputDatePickerColumn
                    field="transactionDate"
                    showLabel
                    fullRow={false}
                />
                <InputSelectColumn
                    field="bank"
                    showLabel
                    items={pageUtils?.pageState?.props?.banks}
                    fullRow={false}
                />
                <InputTextColumn
                    field="invoiceNo"
                    showLabel
                    icon={"icon-card-pos4"}
                />
                <InputTextColumn
                    field="price"
                    showLabel
                    type="number"
                    textAlign="left"
                    icon={"icon-dollar-square4"}
                />
            </InputRow>
            <InputTextColumn
                field="description"
                showLabel
                icon={"icon-edit-24"}
            />
        </FormPage>
    );
};

export default EditShareAction;
