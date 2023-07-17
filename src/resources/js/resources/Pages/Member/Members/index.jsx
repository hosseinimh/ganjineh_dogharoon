import React from "react";
import { useSelector } from "react-redux";

import {
  InputRow,
  InputSelectColumn,
  InputTextColumn,
  ListPage,
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

export const types = [
  { id: 1, value: genderTypes.male },
  { id: 2, value: genderTypes.female },
];

const Members = () => {
  const layoutState = useSelector((state) => state.layoutReducer);
  const userState = useSelector((state) => state.userReducer);
  const pageState = useSelector((state) => state.pageReducer);
  const columnsCount =
    userState?.user?.role === USER_ROLES.ADMINISTRATOR ? 5 : 4;
  const pageUtils = new PageUtils();

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
          field="nameFamily"
          fullRow={false}
          icon={"icon-personalcard4"}
        />
        <InputTextColumn
          field="nationalNo"
          textAlign="left"
          fullRow={false}
          icon={"icon-personalcard4"}
        />
        <InputTextColumn
          field="memberNo"
          textAlign="left"
          fullRow={false}
          icon={"icon-personalcard4"}
        />
      </InputRow>
    </SearchBox>
  );

  const renderHeader = () => (
    <tr>
      <th>{strings.nameFamily}</th>
      <th style={{ width: "100px" }}>{strings.nationalNo}</th>
      <th style={{ width: "100px" }}>{strings.memberNo}</th>
      <th style={{ width: "100px" }}>{strings.memberRelationsCount}</th>
      {userState?.user?.role === USER_ROLES.ADMINISTRATOR && (
        <th style={{ width: "150px" }}>{general.actions}</th>
      )}
    </tr>
  );

  const renderItems = () => {
    const children = pageState?.props?.items?.map((item) => (
      <React.Fragment key={item.id}>
        <tr>
          <td>{`${item.name} ${item.family}`}</td>
          <td>{item.nationalNo}</td>
          <td>{item.memberNo}</td>
          <td>{item.memberRelationsCount}</td>
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
                type="button"
                className="btn btn-primary mx-5"
                onClick={() => pageUtils.onMemberRelations(item)}
                title={strings.memberRelations}
                disabled={layoutState?.loading}
              >
                {strings.memberRelations}
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
      renderTopList={renderSearch}
    ></ListPage>
  );
};

export default Members;
