import { USER_ROLES } from "../../../constants";
import { dashboardPage as strings } from "../../../constants/strings/fa";
import { Dashboard as Entity } from "../../../http/entities";
import {
  setLoadingAction,
  setNotificationsAction,
} from "../../../state/layout/layoutActions";
import { setPagePropsAction } from "../../../state/page/pageActions";
import { BasePageUtils } from "../../../utils/BasePageUtils";

export class PageUtils extends BasePageUtils {
  constructor(useForm) {
    super("Dashboard", strings, useForm);
    this.entity = new Entity();
    this.initialPageProps =
      this.userState?.user?.role === USER_ROLES.ADMINISTRATOR
        ? {
            usersCount: 0,
          }
        : {
            tradesCount: 0,
          };
  }

  onLoad() {
    super.onLoad();
    this.dispatch(setPagePropsAction(this.initialPageProps));
    this.fillForm();
  }

  async fillForm(data = null) {
    this.dispatch(setLoadingAction(true));
    await this.fetchData(data);
    this.dispatch(setLoadingAction(false));
  }

  async fetchData() {
    try {
      let result =
        this.userState?.user?.role === USER_ROLES.ADMINISTRATOR
          ? await this.entity.get()
          : await this.entity.getFromUser();
      this.handleFetchResult(
        result,
        this.propsIfOK(result),
        this.propsIfNull()
      );
    } catch {}
  }

  propsIfOK(result) {
    if (this.userState?.user?.role === USER_ROLES.ADMINISTRATOR) {
      this.dispatch(
        setNotificationsAction({
          verifyUserRequestsCount: result.verifyUserRequestsCount,
          waitingChallengesCount: result.waitingChallengesCount,
          systemNotifications: result.systemNotifications,
          userNotifications: result.userNotifications,
        })
      );
    } else {
      this.dispatch(
        setNotificationsAction({
          systemNotifications: result.systemNotifications,
          userNotifications: result.userNotifications,
        })
      );
    }
    return this.userState?.user?.role === USER_ROLES.ADMINISTRATOR
      ? {
          usersCount: result?.usersCount ?? 0,
        }
      : {
          tradesCount: result?.tradesCount ?? 0,
        };
  }
}
