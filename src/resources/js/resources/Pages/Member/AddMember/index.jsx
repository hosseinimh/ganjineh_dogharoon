import React from "react";
import { useMediaQuery } from "react-responsive";

import {
    InputTextColumn,
    FormPage,
    InputRow,
    InputDatePickerColumn,
    InputSelectColumn,
} from "../../../components";
import { PageUtils } from "./PageUtils";
import { types } from "../Members";

const AddMember = () => {
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
                    icon={"icon-personalcard4"}
                />
                <InputTextColumn
                    field="family"
                    fullRow={false}
                    icon={"icon-personalcard4"}
                />
                <InputTextColumn
                    field="nationalNo"
                    fullRow={false}
                    icon={"icon-personalcard4"}
                />
                <InputTextColumn
                    field="identityNo"
                    fullRow={false}
                    type="number"
                    icon={"icon-personalcard4"}
                />
            </InputRow>
            <InputRow>
                <InputTextColumn
                    field="fatherName"
                    fullRow={false}
                    icon={"icon-personalcard4"}
                />
                <InputDatePickerColumn field="birthDate" fullRow={false} />
                <InputDatePickerColumn field="membershipDate" fullRow={false} />
                <InputTextColumn
                    field="postalCode"
                    fullRow={false}
                    icon={"icon-support"}
                />
            </InputRow>
            <InputRow>
                <InputSelectColumn
                    field="gender"
                    items={types}
                    fullRow={false}
                />
                <InputSelectColumn
                    field="village"
                    items={pageUtils?.pageState?.props?.villages}
                    fullRow={false}
                />
                <InputTextColumn
                    field="tel"
                    fullRow={false}
                    icon={"icon-call-calling"}
                />
                <InputTextColumn
                    field="mobile"
                    fullRow={false}
                    icon={"icon-mobile"}
                />
            </InputRow>
            <InputTextColumn field="address" icon={"icon-location4"} />
            <InputTextColumn field="description" icon={"icon-edit-24"} />
            <InputRow>
                <InputTextColumn
                    field="cardNo"
                    type="number"
                    fullRow={false}
                    icon={"icon-card-pos4"}
                />
                {isPCScreen && <div style={{ flexGrow: "4" }}></div>}
            </InputRow>
        </FormPage>
    );
};

export default AddMember;
