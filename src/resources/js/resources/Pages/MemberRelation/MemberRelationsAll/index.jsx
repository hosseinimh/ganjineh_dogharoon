import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { slideDown, slideUp } from "es6-slide-up-down";
import { easeOutQuint } from "es6-easings";

import {
  CustomLink,
  ListPage,
  TableFooter,
  TableItems,
} from "../../../components";
import { PageUtils } from "./PageUtils";
import {
  memberRelationsAllPage as strings,
  general,
} from "../../../../constants/strings/fa";
import { USER_ROLES } from "../../../../constants";
import { setDropDownElementAction } from "../../../../state/layout/layoutActions";

const MemberRelationsAll = () => {
  const layoutState = useSelector((state) => state.layoutReducer);
  const userState = useSelector((state) => state.userReducer);
  const pageState = useSelector((state) => state.pageReducer);
  const dispatch = useDispatch();
  const columnsCount =
    userState?.user?.role === USER_ROLES.ADMINISTRATOR ? 7 : 6;
  const pageUtils = new PageUtils();

  const toggleTransfer = (e) => {
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

  const renderHeader = () => (
    <tr>
      <th>{strings.nameFamily}</th>
      <th style={{ width: "150px" }}>{strings.memberNameFamily}</th>
      <th style={{ width: "100px" }}>{strings.nationalNo}</th>
      <th style={{ width: "100px" }}>{strings.identityNo}</th>
      <th style={{ width: "100px" }}>{strings.birthDate}</th>
      <th style={{ width: "100px" }}>{strings.relationship}</th>
      {userState?.user?.role === USER_ROLES.ADMINISTRATOR && (
        <th style={{ width: "150px" }}>{general.actions}</th>
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
        )}/${item.birthDate.substring(2, 4)}/${item.birthDate.substring(4, 6)}`;
      } else if (item.birthDate?.length === 8) {
        birthDate = `${item.birthDate.substring(
          0,
          4
        )}/${item.birthDate.substring(4, 6)}/${item.birthDate.substring(6, 8)}`;
      }
      return (
        <React.Fragment key={item.id}>
          <tr>
            <td>{`${item.name} ${item.family}`}</td>
            <td>{`${item.memberName} ${item.memberFamily} - ${item.memberNationalNo}`}</td>
            <td>{item.nationalNo}</td>
            <td>{item.identityNo}</td>
            <td>{birthDate}</td>
            <td>{item.relationshipName}</td>
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
                <button
                  id="print"
                  type="button"
                  className="btn btn-primary btn-dropdown mx-rdir-10"
                  onClick={(e) => toggleTransfer(e)}
                >
                  <div className="d-flex">
                    <span className="grow-1 mx-rdir-10">
                      {strings.transfer}
                    </span>
                    <div className="icon">
                      <i className="icon-arrow-down5"></i>
                    </div>
                  </div>
                  <div className="dropdown-menu dropdown-menu-end">
                    <ul>
                      <li>
                        <CustomLink
                          onClick={() => pageUtils.transferToMemberAction(item)}
                        >
                          {strings.transferAsMember}
                        </CustomLink>
                      </li>
                      <li>
                        <CustomLink onClick={() => pageUtils.editAction()}>
                          {strings.transferAsMemberRelation}
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
      hasAdd={false}
    ></ListPage>
  );
};

export default MemberRelationsAll;