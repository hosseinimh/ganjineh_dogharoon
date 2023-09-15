import React from "react";
import { useMediaQuery } from "react-responsive";

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
import { transferMemberRelationToMemberPage as strings } from "../../../../constants/strings/fa";

const TransferMemberToMemberRelation = () => {
    const pageUtils = new PageUtils();
    const isPCScreen = useMediaQuery({
        query: "(min-width: 1224px)",
    });

    return (
        <FormPage pageUtils={pageUtils}>
            <InputRow>
                <InputTextColumn
                    field="name"
                    fullRow={false}
                    readOnly={true}
                    showLabel
                    icon={"icon-personalcard4"}
                />
                <InputTextColumn
                    field="family"
                    fullRow={false}
                    readOnly={true}
                    showLabel
                    icon={"icon-personalcard4"}
                />
                <InputTextColumn
                    field="nationalNo"
                    fullRow={false}
                    readOnly={true}
                    showLabel
                    icon={"icon-personalcard4"}
                />
                <InputTextColumn
                    field="identityNo"
                    fullRow={false}
                    readOnly={true}
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
                    readOnly={true}
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
                    readOnly={true}
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
            <InputRow>
                <InputTextColumn
                    field="cardNo"
                    type="number"
                    fullRow={false}
                    showLabel
                    icon={"icon-personalcard4"}
                />
                {isPCScreen && <div style={{ flexGrow: "4" }}></div>}
            </InputRow>
            <p className="input-info">
                <span>{strings.maxCardNo}:</span>
                <span className="text mx-10">
                    {pageUtils?.pageState?.props?.maxCardNo}
                </span>
            </p>
        </FormPage>
    );
};

export default TransferMemberToMemberRelation;
