import React from "react";
import { useSelector } from "react-redux";

import { ListPage, TableFooter, TableItems } from "../../../components";
import { PageUtils } from "./PageUtils";
import {
    shareActionsPage as strings,
    general,
    shareActionTypes,
} from "../../../../constants/strings/fa";
import { SHARE_ACTIONS, USER_ROLES } from "../../../../constants";
import utils from "../../../../utils/Utils";

export const types = [
    { id: SHARE_ACTIONS.BUY, value: shareActionTypes.buy },
    { id: SHARE_ACTIONS.SELL, value: shareActionTypes.sell },
    { id: SHARE_ACTIONS.REFUND, value: shareActionTypes.refund },
];

const ShareActions = () => {
    const layoutState = useSelector((state) => state.layoutReducer);
    const userState = useSelector((state) => state.userReducer);
    const pageState = useSelector((state) => state.pageReducer);
    const columnsCount =
        userState?.user?.role === USER_ROLES.ADMINISTRATOR ? 4 : 3;
    const pageUtils = new PageUtils();

    const renderTopList = () => {
        return (
            <>
                <div className="d-flex mx-10 pd-20 bg-body rounded">
                    <span>{strings.remainedShares}:</span>
                    <span className="text mx-5">
                        {pageState?.props?.member
                            ? utils.addCommas(pageState?.props?.member?.shares)
                            : 0}
                    </span>
                </div>
            </>
        );
    };

    const renderHeader = () => (
        <tr>
            <th style={{ width: "100px" }}>{strings.actionType}</th>
            <th style={{ width: "150px" }}>{strings.actionDate}</th>
            <th>{strings.description}</th>
            {userState?.user?.role === USER_ROLES.ADMINISTRATOR && (
                <th style={{ width: "100px" }}>{general.actions}</th>
            )}
        </tr>
    );

    const renderItems = () => {
        const children = pageState?.props?.items?.map((item) => (
            <React.Fragment key={item.id}>
                <tr>
                    <td
                        className={
                            item.actionType === SHARE_ACTIONS.BUY
                                ? "success"
                                : "danger"
                        }
                    >
                        {item.actionTypeText}
                    </td>
                    <td>{item.actionDate}</td>
                    <td>
                        {item.description?.length > 100
                            ? `${item.description.substring(0, 100)} ...`
                            : item.description}
                    </td>
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
            renderTopList={renderTopList}
        ></ListPage>
    );
};

export default ShareActions;
