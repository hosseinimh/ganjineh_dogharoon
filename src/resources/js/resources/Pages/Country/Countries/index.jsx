import React from "react";
import { useSelector } from "react-redux";

import { ListPage, TableFooter, TableItems } from "../../../components";
import { PageUtils } from "./PageUtils";
import {
    countriesPage as strings,
    general,
} from "../../../../constants/strings/fa";
import { USER_ROLES } from "../../../../constants";

const Countries = () => {
    const layoutState = useSelector((state) => state.layoutReducer);
    const userState = useSelector((state) => state.userReducer);
    const pageState = useSelector((state) => state.pageReducer);
    const columnsCount =
        userState?.user?.role === USER_ROLES.ADMINISTRATOR ? 2 : 1;
    const pageUtils = new PageUtils();

    const renderHeader = () => (
        <tr>
            <th>{strings.name}</th>
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
        ></ListPage>
    );
};

export default Countries;
