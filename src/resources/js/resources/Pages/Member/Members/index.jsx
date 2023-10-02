import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { slideDown, slideUp } from "es6-slide-up-down";
import { easeOutQuint } from "es6-easings";

import {
    CustomLink,
    InputRow,
    InputSelectColumn,
    InputTextColumn,
    ListPage,
    PromptModal,
    SearchBox,
    TableFooter,
    TableItems,
} from "../../../components";
import { PageUtils } from "./PageUtils";
import {
    membersPage as strings,
    general,
    genderTypes,
} from "../../../../constants/strings/fa";
import { USER_ROLES } from "../../../../constants";
import utils from "../../../../utils/Utils";
import { setDropDownElementAction } from "../../../../state/layout/layoutActions";
import TransferMemberToMemberRelationModal from "../../../components/Modal/TransferMemberToMemberRelationModal";

export const types = [
    { id: 1, value: genderTypes.male },
    { id: 2, value: genderTypes.female },
];

const Members = () => {
    const layoutState = useSelector((state) => state.layoutReducer);
    const userState = useSelector((state) => state.userReducer);
    const pageState = useSelector((state) => state.pageReducer);
    const dispatch = useDispatch();
    const columnsCount =
        userState?.user?.role === USER_ROLES.ADMINISTRATOR ? 9 : 8;
    const pageUtils = new PageUtils();

    const renderTopList = () => {
        return (
            <>
                {renderSearch()}
                <div className="d-flex mx-10 pd-20">
                    <span>{strings.allMembersCount}:</span>
                    <span className="text mx-5">
                        {pageState?.props?.itemsCount
                            ? utils.addCommas(pageState?.props?.itemsCount)
                            : 0}
                    </span>
                    <span className="mx-10"></span>
                    <span>{strings.allMemberRelationsCount}:</span>
                    <span className="text mx-5">
                        {pageState?.props?.memberRelationsCount
                            ? utils.addCommas(
                                  pageState?.props?.memberRelationsCount
                              )
                            : 0}
                    </span>
                    <span className="mx-10"></span>
                    <span>{strings.allCount}:</span>
                    <span className="text mx-5">
                        {pageState?.props?.itemsCount &&
                        pageState?.props?.memberRelationsCount
                            ? utils.addCommas(
                                  pageState?.props?.itemsCount +
                                      pageState?.props?.memberRelationsCount
                              )
                            : 0}
                    </span>
                </div>
            </>
        );
    };

    const renderSearch = () => (
        <SearchBox
            pageUtils={pageUtils}
            onSubmit={pageUtils.onSubmit}
            onReset={pageUtils.onReset}
        >
            <InputRow>
                <InputSelectColumn
                    field="village"
                    items={pageUtils?.pageState?.props?.villages}
                    fullRow={false}
                />
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
            </InputRow>
            <InputRow>
                <InputTextColumn
                    field="nationalNo"
                    textAlign="left"
                    fullRow={false}
                    icon={"icon-personalcard4"}
                />
                <InputTextColumn
                    field="cardNo"
                    textAlign="left"
                    fullRow={false}
                    icon={"icon-card-pos4"}
                />
                <div></div>
            </InputRow>
        </SearchBox>
    );

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

    const renderButtons = () => (
        <>
            <button
                id="print"
                type="button"
                className="btn btn-primary btn-dropdown mx-rdir-10"
                onClick={(e) => togglePrint(e)}
            >
                <div className="d-flex">
                    <span className="grow-1 mx-rdir-10">{general.print}</span>
                    <div className="icon">
                        <i className="icon-arrow-down5"></i>
                    </div>
                </div>
                <div className="dropdown-menu">
                    <ul>
                        <li>
                            <CustomLink
                                onClick={() =>
                                    pageUtils.printWithMobileAction()
                                }
                                disabled={layoutState?.loading}
                            >
                                {strings.printWithMobile}
                            </CustomLink>
                        </li>
                        <li>
                            <CustomLink
                                onClick={() =>
                                    pageUtils.printWitouthMobileAction()
                                }
                                disabled={layoutState?.loading}
                            >
                                {strings.printWithoutMobile}
                            </CustomLink>
                        </li>
                    </ul>
                </div>
            </button>
        </>
    );

    const renderHeader = () => (
        <tr>
            <th style={{ width: "60px" }}>{strings.cardNo}</th>
            <th>{strings.nameFamily}</th>
            <th style={{ width: "100px" }}>{strings.nationalNo}</th>
            <th style={{ width: "100px" }}>{strings.identityNo}</th>
            <th style={{ width: "100px" }}>{strings.birthDate}</th>
            <th style={{ width: "100px" }}>{strings.fatherName}</th>
            <th style={{ width: "100px" }}>
                {strings.allMemberRelationsCount}
            </th>
            <th style={{ width: "100px" }}>{strings.village}</th>
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
                        <td>{item.cardNo}</td>
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
                        <td>{item.fatherName}</td>
                        <td>
                            <CustomLink
                                onClick={() =>
                                    pageUtils.onMemberRelations(item)
                                }
                                disabled={layoutState?.loading}
                            >
                                {`${item.memberRelationsCount} ${general.person}`}
                            </CustomLink>
                        </td>
                        <td>{item.villageName}</td>
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
                                                        pageUtils.onMemberRelations(
                                                            item
                                                        )
                                                    }
                                                    disabled={
                                                        layoutState?.loading
                                                    }
                                                >
                                                    {strings.memberRelations}
                                                </CustomLink>
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
                                                    onClick={(e) =>
                                                        pageUtils.transferMemberToMemberRelationModal(
                                                            e,
                                                            item
                                                        )
                                                    }
                                                    disabled={
                                                        layoutState?.loading
                                                    }
                                                >
                                                    {
                                                        strings.transferMemberToMemberRelation
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
            renderTopList={renderTopList}
            renderButtons={renderButtons}
        >
            <PromptModal />
            <TransferMemberToMemberRelationModal />
        </ListPage>
    );
};

export default Members;
