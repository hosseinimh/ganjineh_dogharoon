import React, { useEffect, useState } from "react";

import {
    InputTextColumn,
    FormPage,
    InputRow,
    InputDatePickerColumn,
    InputSelectColumn,
    InputSwitchCheckboxColumn,
} from "../../../components";
import { PageUtils } from "./PageUtils";
import { types } from "../ShareActions";

const AddShareAction = () => {
    const pageUtils = new PageUtils();
    const [hasTransaction, setHasTransaction] = useState(false);

    useEffect(() => {
        if (!hasTransaction) {
            pageUtils?.useForm?.setValue("transactionDate", undefined);
            pageUtils?.useForm?.setValue("bank", undefined);
            pageUtils?.useForm?.setValue("invoiceNo", "");
            pageUtils?.useForm?.setValue("price", 0);
        }
    }, [hasTransaction]);

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
                <div></div>
                <div></div>
            </InputRow>
            <InputSwitchCheckboxColumn
                field="hasTransaction"
                onChange={(e) => setHasTransaction(e.target.value)}
            />
            {hasTransaction && (
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
            )}
            <InputTextColumn
                field="description"
                showLabel
                icon={"icon-edit-24"}
            />
        </FormPage>
    );
};

export default AddShareAction;
