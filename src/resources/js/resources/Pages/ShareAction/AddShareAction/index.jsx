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

const AddShareAction = () => {
    const pageUtils = new PageUtils();

    return (
        <FormPage pageUtils={pageUtils}>
            <InputRow>
                <InputDatePickerColumn
                    field="actionDate"
                    showLabel
                    fullRow={false}
                />
                <InputSelectColumn
                    field="actionType"
                    showLabel
                    items={types}
                    fullRow={false}
                />
                <InputTextColumn
                    field="count"
                    showLabel
                    type="number"
                    fullRow={false}
                    icon={"icon-personalcard4"}
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

export default AddShareAction;
