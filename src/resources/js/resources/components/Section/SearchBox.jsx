import React from "react";
import { useSelector } from "react-redux";

import { general as strings } from "../../../constants/strings/fa";

const SearchBox = ({
    children,
    pageUtils,
    onSubmit,
    onReset,
    containerClassName,
}) => {
    const layoutState = useSelector((state) => state.layoutReducer);

    return (
        <div
            className={
                containerClassName ? `${containerClassName}` : `block pd-20`
            }
        >
            <div className="field-title">{strings.search}</div>
            <div>{children}</div>
            <div className="btns d-flex mt-10">
                <button
                    className="btn btn-primary mx-rdir-10"
                    type="button"
                    disabled={layoutState?.loading}
                    title={strings.search}
                    onClick={pageUtils.useForm.handleSubmit(onSubmit)}
                >
                    {strings.search}
                </button>
                <button
                    className="btn btn-border mx-rdir-10"
                    type="button"
                    disabled={layoutState?.loading}
                    title={strings.reset}
                    onClick={onReset}
                >
                    {strings.reset}
                </button>
            </div>
        </div>
    );
};

export default SearchBox;
