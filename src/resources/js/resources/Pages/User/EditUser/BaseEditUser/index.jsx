import React from "react";
import { useSelector } from "react-redux";

import {
  InputRadioColumn,
  InputTextColumn,
  FormPage,
  InputCheckboxColumn,
  InputCheckboxContainer,
  InputRadioContainer,
  InputRow,
} from "../../../../components";
import { PageUtils } from "./PageUtils";
import { USER_ROLES } from "../../../../../constants";
import { editUserPage as strings } from "../../../../../constants/strings/fa";

const BaseEditUser = ({ userId }) => {
  const pageUtils = new PageUtils(userId);
  const userState = useSelector((state) => state.userReducer);

  return (
    <FormPage pageUtils={pageUtils}>
      <InputRow>
        <InputTextColumn
          field="name"
          showLabel={true}
          fullRow={false}
          icon={"icon-personalcard4"}
        />
        <InputTextColumn
          field="family"
          showLabel={true}
          fullRow={false}
          icon={"icon-personalcard4"}
        />
        <InputTextColumn
          field="mobile"
          showLabel={true}
          textAlign="left"
          fullRow={false}
          icon={"icon-mobile"}
        />
      </InputRow>
      {userState?.user?.role === USER_ROLES.ADMINISTRATOR && (
        <>
          <InputCheckboxContainer>
            <InputCheckboxColumn field="isActive" checked={true} />
          </InputCheckboxContainer>
          <InputRadioContainer label={strings.type}>
            <InputRadioColumn
              field="administrator"
              name="type"
              checked={true}
            />
            <InputRadioColumn field="user" name="type" />
          </InputRadioContainer>
        </>
      )}
    </FormPage>
  );
};

export default BaseEditUser;
