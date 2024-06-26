import React from "react";

import {
    InputTextColumn,
    FormPage,
    InputRow,
    InputDatePickerColumn,
    InputSelectColumn,
    InputTextAreaColumn,
} from "../../../components";
import { PageUtils } from "./PageUtils";
import { types } from "../Members";
import { editMemberPage as strings } from "../../../../constants/strings/fa";

const EditMember = () => {
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
                <InputTextColumn
                    field="fatherName"
                    fullRow={false}
                    showLabel
                    icon={"icon-personalcard4"}
                />
                <InputDatePickerColumn
                    field="birthDate"
                    fullRow={false}
                    showLabel
                />
                <InputDatePickerColumn
                    field="membershipDate"
                    fullRow={false}
                    showLabel
                />
                <InputTextColumn
                    field="postalCode"
                    fullRow={false}
                    showLabel
                    icon={"icon-support"}
                />
            </InputRow>
            <InputRow containerStyle={{ marginBottom: "2rem" }}>
                <span style={{ marginLeft: "1rem" }}>{strings.birthDate}:</span>
                <span className="text">
                    {pageUtils?.pageState?.props?.item?.birthDate}
                </span>
                <span style={{ marginRight: "2rem", marginLeft: "1rem" }}>
                    {strings.membershipDate}:
                </span>
                <span className="text">
                    {pageUtils?.pageState?.props?.item?.membershipDate}
                </span>
            </InputRow>
            <InputRow>
                <InputSelectColumn
                    field="gender"
                    items={types}
                    fullRow={false}
                    showLabel
                />
                <InputSelectColumn
                    field="village"
                    items={pageUtils?.pageState?.props?.villages}
                    fullRow={false}
                    showLabel
                />
                <InputTextColumn
                    field="tel"
                    fullRow={false}
                    showLabel
                    icon={"icon-call-calling"}
                />
                <InputTextColumn
                    field="mobile"
                    fullRow={false}
                    showLabel
                    icon={"icon-mobile"}
                />
            </InputRow>
            <InputTextColumn
                field="address"
                showLabel
                icon={"icon-location4"}
            />
            <InputTextAreaColumn field="description" showLabel />
            <InputTextAreaColumn
                field="transferDescription"
                showLabel
                readOnly
            />
            <InputRow>
                <InputTextColumn
                    field="cardNo"
                    type="number"
                    fullRow={false}
                    showLabel
                    icon={"icon-card-pos4"}
                />
                <div></div>
                <div></div>
                <div></div>
            </InputRow>
        </FormPage>
    );
};

export default EditMember;
