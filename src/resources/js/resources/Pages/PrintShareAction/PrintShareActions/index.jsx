import React from "react";
import { useSelector } from "react-redux";

import {
    ListPage,
    PromptModal,
    TableFooter,
    TableItems,
} from "../../../components";
import { PageUtils } from "./PageUtils";
import {
    printShareActionsPage as strings,
    general,
} from "../../../../constants/strings/fa";
import utils from "../../../../utils/Utils";
import { BASE_PATH } from "../../../../constants";

const PrintShareAction = () => {
    const pageState = useSelector((state) => state.pageReducer);
    const columnsCount = 2;
    const pageUtils = new PageUtils();

    const renderHeader = () => (
        <tr>
            <th style={{ width: "150px" }}>{strings.createdAt}</th>
            <th>{strings.user}</th>
        </tr>
    );

    const renderItems = () => {
        const children = pageState?.props?.items?.map((item) => {
            const { date, time } = utils.getTimezoneDate(
                item.createdAt,
                general.locale
            );
            return (
                <React.Fragment key={item.id}>
                    <tr>
                        <td className="d-flex-wrap just-around">
                            <div>{date}</div>
                            <div>{time}</div>
                        </td>
                        <td>{`${item.userName} ${item.userFamily}`}</td>
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
            backUrl={`${BASE_PATH}/share_actions/${pageState?.params?.ownerId}/${pageState?.params?.isMember}`}
        >
            <PromptModal />
        </ListPage>
    );
};

export default PrintShareAction;
