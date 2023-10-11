import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { slideDown, slideUp } from "es6-slide-up-down";
import { easeOutQuint } from "es6-easings";

import {
    CustomLink,
    ListPage,
    PromptModal,
    TableFooter,
    TableItems,
} from "../../../components";
import { PageUtils } from "./PageUtils";
import {
    shareActionsPage as strings,
    general,
    shareActionTypes,
} from "../../../../constants/strings/fa";
import { SHARE_ACTIONS, USER_ROLES } from "../../../../constants";
import utils from "../../../../utils/Utils";

import { setDropDownElementAction } from "../../../../state/layout/layoutActions";

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
    const dispatch = useDispatch();

    const toggleActions = (e, id) => {
        e.stopPropagation();
        const element = document.querySelector(`#${id}`).lastChild;
        if (layoutState?.dropDownElement) {
            slideUp(layoutState.dropDownElement);
            if (layoutState?.dropDownElement === element) {
                dispatch(setDropDownElementAction(null));
                return;
            }
        }
        dispatch(setDropDownElementAction(element));
        slideDown(element, {
            duration: 400,
            easing: easeOutQuint,
        });
    };

    const togglePrint = (e) => {
        e.stopPropagation();
        const element = document.querySelector("#print").lastChild;
        if (layoutState?.dropDownElement) {
            slideUp(layoutState.dropDownElement);
            if (layoutState?.dropDownElement === element) {
                dispatch(setDropDownElementAction(null));
                return;
            }
        }
        dispatch(setDropDownElementAction(element));
        slideDown(element, {
            duration: 400,
            easing: easeOutQuint,
        });
    };

    const renderTopList = () => {
        return (
            <>
                <div className="d-flex mx-10 pd-20 bg-body rounded">
                    <span>{strings.remainedShares}:</span>
                    <span className="text mx-5">
                        {pageState?.props?.owner
                            ? utils.addCommas(pageState?.props?.owner?.shares)
                            : 0}
                    </span>
                </div>
            </>
        );
    };

    const renderButtons = () => (
        <>
            <button
                id="print"
                type="button"
                className="btn btn-primary btn-dropdown mx-rdir-10"
                onClick={(e) => togglePrint(e)}
            >
                <div className="d-flex">
                    <span className="grow-1 mx-rdir-10">{strings.print}</span>
                    <div className="icon">
                        <i className="icon-arrow-down5"></i>
                    </div>
                </div>
                <div className="dropdown-menu">
                    <ul>
                        <li>
                            <CustomLink
                                onClick={() => pageUtils.printPage1()}
                                disabled={layoutState?.loading}
                            >
                                {strings.printPage1}
                            </CustomLink>
                        </li>
                        <li>
                            <CustomLink
                                onClick={() => pageUtils.printPage2()}
                                disabled={layoutState?.loading}
                            >
                                {strings.printPage2}
                            </CustomLink>
                        </li>
                    </ul>
                </div>
            </button>
            <button
                className="btn btn-primary mx-rdir-10"
                type="button"
                title={strings.printShareActions}
                onClick={pageUtils.onPrintShareActions}
                disabled={layoutState?.loading}
            >
                {strings.printShareActions}
            </button>
        </>
    );

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
                                id={`actions-${item.id}`}
                                type="button"
                                className="btn btn-primary btn-dropdown mx-rdir-10"
                                onClick={(e) =>
                                    toggleActions(e, `actions-${item.id}`)
                                }
                                disabled={layoutState?.loading}
                            >
                                <div className="d-flex">
                                    <span className="grow-1 mx-rdir-10">
                                        {general.actions}
                                    </span>
                                    <div className="icon">
                                        <i className="icon-arrow-down5"></i>
                                    </div>
                                </div>
                                <div className="dropdown-menu dropdown-menu-end">
                                    <ul>
                                        <li>
                                            <CustomLink
                                                onClick={() =>
                                                    pageUtils.onEdit(item)
                                                }
                                                disabled={layoutState?.loading}
                                            >
                                                {general.edit}
                                            </CustomLink>
                                        </li>
                                        <li>
                                            <CustomLink
                                                onClick={(e) =>
                                                    pageUtils.onRemove(e, item)
                                                }
                                                disabled={layoutState?.loading}
                                            >
                                                {general.remove}
                                            </CustomLink>
                                        </li>
                                    </ul>
                                </div>
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
            renderButtons={renderButtons}
        >
            <PromptModal />
        </ListPage>
    );
};

export default ShareActions;
