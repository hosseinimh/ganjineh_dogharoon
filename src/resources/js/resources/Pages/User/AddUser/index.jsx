import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
    InputRadioColumn,
    InputTextColumn,
    FormPage,
    InputCheckboxColumn,
} from "../../../components";
import * as funcs from "./funcs";
import { addUserPage as strings } from "../../../../constants/strings";
import { addUserSchema as schema } from "../../../validations";

const AddUser = () => {
    const form = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <FormPage page={"Users"} strings={strings} funcs={funcs} useForm={form}>
            <InputTextColumn
                field="username"
                inputStyle={{ textAlign: "left" }}
            />
            <InputTextColumn
                field="password"
                type="password"
                inputStyle={{ textAlign: "left" }}
            />
            <InputTextColumn
                field="confirmPassword"
                type="password"
                inputStyle={{ textAlign: "left" }}
            />
            <InputTextColumn field="name" />
            <InputTextColumn field="family" />
            <InputTextColumn
                field="mobile"
                type="number"
                inputStyle={{ textAlign: "left" }}
            />
            <div className="col-md-3 col-sm-12 pb-4">
                <label className="form-label">{strings.status}</label>
                <InputCheckboxColumn field="isActive" checked={true} />
            </div>
            <div className="col-md-3 col-sm-12 pb-4">
                <label className="form-label">{strings.type}</label>
                <InputRadioColumn
                    field="administrator"
                    name="type"
                    checked={true}
                />
                <InputRadioColumn field="user" name="type" />
            </div>
        </FormPage>
    );
};

export default AddUser;
