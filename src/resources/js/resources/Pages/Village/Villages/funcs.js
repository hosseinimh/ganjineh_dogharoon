import { useSelector } from "react-redux";

import { BASE_PATH, MESSAGE_TYPES } from "../../../../constants";
import { villagesPage as strings } from "../../../../constants/strings";
import { Village as Entity } from "../../../../http/entities";
import {
    setLoadingAction,
    setPageIconAction,
    setPagePropsAction,
    setPageTitleAction,
} from "../../../../state/layout/layoutActions";
import { setMessageAction } from "../../../../state/message/messageActions";

let _dispatch;
let _navigate;
let _ls;
let _pageProps;
let _entity = new Entity();

export const init = (dispatch, navigate) => {
    _dispatch = dispatch;
    _navigate = navigate;
    _ls = useSelector((state) => state.layoutReducer);
};

export const onLoad = (params) => {
    _pageProps = {
        pageNumber: 1,
        itemsCount: 0,
        item: null,
        items: null,
        action: null,
    };

    _dispatch(setPagePropsAction(_pageProps));
    _dispatch(setPageIconAction("pe-7s-news-paper"));
    _dispatch(setPageTitleAction(strings._title, strings._subTitle));

    fillForm();
};

export const onLayoutState = () => {
    if (_ls?.pageProps === null) {
        return;
    }

    if (_ls?.pageProps?.pageNumber !== _pageProps?.pageNumber) {
        _pageProps = _ls?.pageProps;

        fillForm();

        return;
    }

    if (_ls?.pageProps?.action !== _pageProps?.action) {
        _pageProps = _ls?.pageProps;

        _dispatch(setPagePropsAction({ action: null }));
    }

    switch (_ls?.pageProps?.action) {
        case "ADD":
            addAction();

            return;
        case "EDIT":
            editAction(_ls?.pageProps?.item);

            return;
    }
};

export const onAdd = () => {
    _dispatch(setPagePropsAction({ action: "ADD" }));
};

export const onEdit = (item) => {
    _dispatch(
        setPagePropsAction({
            action: "EDIT",
            item,
        })
    );
};

export const setPage = (page) => {
    _dispatch(setPagePropsAction({ pageNumber: page }));
};

export const onSubmit = (data) => {
    fillForm(data);
};

const addAction = () => {
    _navigate(`${BASE_PATH}/villages/add`);
};

const editAction = (item) => {
    if (!isNaN(item?.id) && item?.id > 0) {
        _navigate(`${BASE_PATH}/villages/edit/${item.id}`);
    }
};

const fillForm = async (data = null) => {
    _dispatch(setLoadingAction(true));

    await fetchPageData(data);

    _dispatch(setLoadingAction(false));
};

const fetchPageData = async (data) => {
    let result = await _entity.getPaginate(0,_ls?.pageProps?.pageNumber ?? 1);

    if (result === null) {
        _dispatch(setPagePropsAction({ items: null }));
        _dispatch(
            setMessageAction(
                _entity.errorMessage,
                MESSAGE_TYPES.ERROR,
                _entity.errorCode
            )
        );

        return;
    }

    _dispatch(
        setPagePropsAction({
            items: result.items,
            itemsCount: result.count,
        })
    );
};
