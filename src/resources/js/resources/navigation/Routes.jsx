import React from "react";
import { useSelector } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import { BASE_PATH, USER_ROLES } from "../../constants";
import * as Pages from "../Pages";

const renderNotAuthRoutes = () => (
  <>
    <Route path={`${BASE_PATH}/users/login`} element={<Pages.Login />} />
    <Route path="*" element={<Navigate to={`${BASE_PATH}/users/login`} />} />
  </>
);

const renderAuthRoutes = () => (
  <>
    <Route path={`${BASE_PATH}/banks`} element={<Pages.Banks />} />
    <Route path={`${BASE_PATH}/countries`} element={<Pages.Countries />} />
    <Route path={`${BASE_PATH}/villages`} element={<Pages.Villages />} />
    <Route
      path={`${BASE_PATH}/relationships`}
      element={<Pages.Relationships />}
    />
    <Route path={`${BASE_PATH}/members`} element={<Pages.Members />} />
    <Route
      path={`${BASE_PATH}/member_relations/:memberId`}
      element={<Pages.MemberRelations />}
    />
    <Route
      path={`${BASE_PATH}/notifications`}
      element={<Pages.Notifications />}
    />
    <Route
      path={`${BASE_PATH}/users/edit`}
      element={<Pages.EditCurrentUser />}
    />
    <Route
      path={`${BASE_PATH}/users/change_password`}
      element={<Pages.ChangePasswordCurrentUser />}
    />
    <Route path={`${BASE_PATH}`} element={<Pages.Dashboard />} />
    <Route path="*" element={<Navigate to={BASE_PATH} />} />
  </>
);

const renderAdministratorRoutes = () => (
  <>
    <Route path={`${BASE_PATH}/banks/add`} element={<Pages.AddBank />} />
    <Route
      path={`${BASE_PATH}/banks/edit/:bankId`}
      element={<Pages.EditBank />}
    />
    <Route path={`${BASE_PATH}/countries/add`} element={<Pages.AddCountry />} />
    <Route
      path={`${BASE_PATH}/countries/edit/:countryId`}
      element={<Pages.EditCountry />}
    />
    <Route path={`${BASE_PATH}/villages/add`} element={<Pages.AddVillage />} />
    <Route
      path={`${BASE_PATH}/villages/edit/:villageId`}
      element={<Pages.EditVillage />}
    />
    <Route
      path={`${BASE_PATH}/relationships/add`}
      element={<Pages.AddRelationship />}
    />
    <Route
      path={`${BASE_PATH}/relationships/edit/:relationshipId`}
      element={<Pages.EditRelationship />}
    />
    <Route path={`${BASE_PATH}/members/add`} element={<Pages.AddMember />} />
    <Route
      path={`${BASE_PATH}/members/edit/:memberId`}
      element={<Pages.EditMember />}
    />
    <Route
      path={`${BASE_PATH}/member_relations/add/:memberId`}
      element={<Pages.AddMemberRelation />}
    />
    <Route
      path={`${BASE_PATH}/member_relations/edit/:memberRelationId`}
      element={<Pages.EditMemberRelation />}
    />
    <Route
      path={`${BASE_PATH}/users/change_password/:userId`}
      element={<Pages.ChangePasswordUser />}
    />
    <Route path={`${BASE_PATH}/users/add`} element={<Pages.AddUser />} />
    <Route
      path={`${BASE_PATH}/users/edit/:userId`}
      element={<Pages.EditUser />}
    />
    <Route path={`${BASE_PATH}/users`} element={<Pages.Users />} />
  </>
);

const renderUserRoutes = () => <></>;

function AppRoutes() {
  const userState = useSelector((state) => state.userReducer);

  return (
    <Router>
      <Routes>
        {!userState?.user && renderNotAuthRoutes()}
        {userState?.user?.role === USER_ROLES.ADMINISTRATOR &&
          renderAdministratorRoutes()}
        {userState?.user?.role === USER_ROLES.USER && renderUserRoutes()}
        {userState?.user && renderAuthRoutes()}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
