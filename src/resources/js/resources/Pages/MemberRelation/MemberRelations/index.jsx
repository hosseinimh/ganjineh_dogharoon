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
    TransferMemberRelationToNewMemberModal,
} from "../../../components";
import { PageUtils } from "./PageUtils";
import {
    memberRelationsPage as strings,
    general,
} from "../../../../constants/strings/fa";
import { BASE_PATH, USER_ROLES } from "../../../../constants";
import { setDropDownElementAction } from "../../../../state/layout/layoutActions";

const MemberRelations = () => {
    const layoutState = useSelector((state) => state.layoutReducer);
    const userState = useSelector((state) => state.userReducer);
    const pageState = useSelector((state) => state.pageReducer);
    const dispatch = useDispatch();
    const columnsCount =
        userState?.user?.role === USER_ROLES.ADMINISTRATOR ? 6 : 5;
    const pageUtils = new PageUtils();

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

    const renderHeader = () => (
        <tr>
            <th>{strings.nameFamily}</th>
            <th style={{ width: "100px" }}>{strings.nationalNo}</th>
            <th style={{ width: "100px" }}>{strings.identityNo}</th>
            <th style={{ width: "100px" }}>{strings.birthDate}</th>
            <th style={{ width: "100px" }}>{strings.relationship}</th>
            {userState?.user?.role === USER_ROLES.ADMINISTRATOR && (
                <th style={{ width: "100px" }}>{general.actions}</th>
            )}
        </tr>
    );

    const renderItems = () => {
        const children = pageState?.props?.items?.map((item) => {
            let birthDate = item.birthDate;
            if (item.birthDate?.length === 6) {
                birthDate = `${item.birthDate.substring(
                    0,
                    2
                )}/${item.birthDate.substring(2, 4)}/${item.birthDate.substring(
                    4,
                    6
                )}`;
            } else if (item.birthDate?.length === 8) {
                birthDate = `${item.birthDate.substring(
                    0,
                    4
                )}/${item.birthDate.substring(4, 6)}/${item.birthDate.substring(
                    6,
                    8
                )}`;
            }
            return (
                <React.Fragment key={item.id}>
                    <tr>
                        <td>
                            <CustomLink
                                onClick={() => pageUtils.onEdit(item)}
                                disabled={layoutState?.loading}
                            >
                                {`${item.name} ${item.family}`}
                            </CustomLink>
                        </td>
                        <td>{item.nationalNo}</td>
                        <td>{item.identityNo}</td>
                        <td>{birthDate}</td>
                        <td>{item.relationshipName}</td>
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
                                                    disabled={
                                                        layoutState?.loading
                                                    }
                                                >
                                                    {general.edit}
                                                </CustomLink>
                                            </li>
                                            <li>
                                                <CustomLink
                                                    onClick={(e) =>
                                                        pageUtils.onRemove(
                                                            e,
                                                            item
                                                        )
                                                    }
                                                    disabled={
                                                        layoutState?.loading
                                                    }
                                                >
                                                    {general.remove}
                                                </CustomLink>
                                            </li>
                                            <li>
                                                <div className="line-gr"></div>
                                            </li>
                                            <li>
                                                <CustomLink
                                                    onClick={() =>
                                                        pageUtils.onShareActions(
                                                            item
                                                        )
                                                    }
                                                    disabled={
                                                        layoutState?.loading
                                                    }
                                                >
                                                    {strings.shares}
                                                </CustomLink>
                                            </li>
                                            <li>
                                                <div className="line-gr"></div>
                                            </li>
                                            <li>
                                                <CustomLink
                                                    onClick={() =>
                                                        pageUtils.transferMemberRelationToMemberAction(
                                                            item
                                                        )
                                                    }
                                                    disabled={
                                                        layoutState?.loading
                                                    }
                                                >
                                                    {
                                                        strings.transferMemberRelationToMember
                                                    }
                                                </CustomLink>
                                            </li>
                                            <li>
                                                <CustomLink
                                                    onClick={(e) =>
                                                        pageUtils.transferMemberRelationToNewMemberModal(
                                                            e,
                                                            item
                                                        )
                                                    }
                                                    disabled={
                                                        layoutState?.loading
                                                    }
                                                >
                                                    {
                                                        strings.transferMemberRelationToNewMember
                                                    }
                                                </CustomLink>
                                            </li>
                                        </ul>
                                    </div>
                                </button>
                            </td>
                        )}
                    </tr>
                </React.Fragment>
            );
        });

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
            backUrl={`${BASE_PATH}/members`}
        >
            <TransferMemberRelationToNewMemberModal />
            <PromptModal />
        </ListPage>
    );
};

export default MemberRelations;
