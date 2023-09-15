import React from "react";
import { useSelector } from "react-redux";

import { ListPage, TableFooter, TableItems } from "../../../components";
import { PageUtils } from "./PageUtils";
import {
    villagesPage as strings,
    districts,
    general,
} from "../../../../constants/strings/fa";
import { DISTRICT, USER_ROLES } from "../../../../constants";

export const districtItems = [
    { id: 1, value: districts.markazi },
    { id: 2, value: districts.mianVelayat },
];

const Villages = () => {
    const layoutState = useSelector((state) => state.layoutReducer);
    const userState = useSelector((state) => state.userReducer);
    const pageState = useSelector((state) => state.pageReducer);
    const columnsCount =
        userState?.user?.role === USER_ROLES.ADMINISTRATOR ? 3 : 2;
    const pageUtils = new PageUtils();

    const onChangeTabContent = (e) => {
        e.stopPropagation();
        [
            ...document.querySelectorAll(
                ".checked-item.tab-item.tab-page-item"
            ),
        ].map((btn) => {
            if (e.target === btn) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });
        pageUtils.onChangeDistrict(e.target.getAttribute("data-tab-content"));
    };

    const renderSubCategories = () => (
        <>
            <div className="checked-list scrollhide d-flex mx-15">
                <button
                    className="checked-item tab-item tab-page-item active"
                    data-tab-content={DISTRICT.ALL}
                    onClick={(e) => onChangeTabContent(e)}
                    disabled={layoutState?.loading}
                >
                    {districts.all}
                </button>
                <button
                    className="checked-item tab-item tab-page-item"
                    data-tab-content={DISTRICT.MARKAZI}
                    onClick={(e) => onChangeTabContent(e)}
                    disabled={layoutState?.loading}
                >
                    {districts.markazi}
                </button>
                <button
                    className="checked-item tab-item tab-page-item"
                    data-tab-content={DISTRICT.MIAN_VELAYAT}
                    onClick={(e) => onChangeTabContent(e)}
                    disabled={layoutState?.loading}
                >
                    {districts.mianVelayat}
                </button>
            </div>
            <div className="block-border"></div>
        </>
    );

    const renderHeader = () => (
        <tr>
            <th>{strings.name}</th>
            <th style={{ width: "150px" }}>{strings.district}</th>
            {userState?.user?.role === USER_ROLES.ADMINISTRATOR && (
                <th style={{ width: "100px" }}>{general.actions}</th>
            )}
        </tr>
    );

    const renderItems = () => {
        const children = pageState?.props?.items?.map((item) => (
            <React.Fragment key={item.id}>
                <tr>
                    <td>{item.name}</td>
                    <td>{item.districtName}</td>
                    {userState?.user?.role === USER_ROLES.ADMINISTRATOR && (
                        <td>
                            <button
                                type="button"
                                className="btn btn-primary mx-5"
                                onClick={() => pageUtils.onEdit(item)}
                                title={general.edit}
                                disabled={layoutState?.loading}
                            >
                                {general.edit}
                            </button>
                        </td>
                    )}
                </tr>
            </React.Fragment>
        ));

        return <TableItems columnsCount={columnsCount}>{children}</TableItems>;
    };

    const renderFooter = () => (
        <TableFooter columnsCount={columnsCount} pageUtils={pageUtils} />
    );

    return (
        <ListPage
            pageUtils={pageUtils}
            table={{ renderHeader, renderItems, renderFooter }}
            hasAdd={userState?.user?.role === USER_ROLES.ADMINISTRATOR}
            renderTopList={renderSubCategories}
        ></ListPage>
    );
};

export default Villages;
