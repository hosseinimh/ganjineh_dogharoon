import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
    general,
    transferMemberToMemberRelationModal as strings,
} from "../../../../constants/strings/fa";
import {
    Modal,
    InputTextColumn,
    InputRow,
    AlertMessage,
    Table,
    TableItems,
    CustomLink,
    InputSelectColumn,
    AlertState,
} from "../..";
import { transferMemberToMemberRelationSchema as schema } from "../../../validations";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../../state/message/messageActions";
import { Member as Entity, MemberRelation } from "../../../../http/entities";
import { MESSAGE_TYPES, MODAL_RESULT } from "../../../../constants";

function TransferMemberToMemberRelationModal() {
    const layoutState = useSelector((state) => state.layoutReducer);
    const dispatch = useDispatch();
    const [modalResult, setModalResult] = useState(undefined);
    const [message, setMessage] = useState(null);
    const [items, setItems] = useState(null);
    const form = useForm({
        resolver: yupResolver(schema),
    });
    const entity = new Entity();
    const columnsCount = 3;

    useEffect(() => {
        if (
            typeof form?.formState?.errors === "object" &&
            form?.formState?.errors
        ) {
            const hasKeys = !!Object.keys(form?.formState?.errors).length;
            if (hasKeys) {
                setMessage(
                    form?.formState?.errors[
                        Object.keys(form?.formState?.errors)[0]
                    ].message
                );
                document
                    .querySelector("#transferMemberToMemberRelationModal")
                    .querySelector(".modal-main")
                    .firstChild.scrollTo(0, 0);
            }
        }
    }, [form?.formState?.errors]);

    useEffect(() => {
        if (modalResult === MODAL_RESULT.OK) {
            if (
                typeof layoutState?.shownModal?.props?.onSubmit === "function"
            ) {
                layoutState?.shownModal?.props?.onSubmit(true);
            }
        } else if (modalResult === MODAL_RESULT.CANCEL) {
            if (
                typeof layoutState?.shownModal?.props?.onCancel === "function"
            ) {
                layoutState?.shownModal?.props?.onCancel();
            }
        }
        setModalResult(undefined);
    }, [modalResult]);

    const onClose = () => {
        setMessage(null);
        onReset();
    };

    const onSubmit = async (data) => {
        dispatch(setLoadingAction(true));
        dispatch(clearMessageAction());
        const result = await entity.getPaginate(
            0,
            data.nameTransferModal,
            data.familyTransferModal,
            data.nationalNoTransferModal,
            data.cardNoTransferModal
        );
        dispatch(setLoadingAction(false));
        if (result === null) {
            setItems(null);
        } else {
            setItems(result.items);
        }
    };

    const onSelect = async (memberId) => {
        dispatch(setLoadingAction(true));
        dispatch(clearMessageAction());
        const memberRelation = new MemberRelation();
        const result = await memberRelation.transferMemberToMemberRelation(
            layoutState?.shownModal?.props?.member?.id,
            memberId,
            form.getValues("relationship")
        );
        dispatch(setLoadingAction(false));
        if (result) {
            setModalResult(MODAL_RESULT.OK);
        } else {
            dispatch(
                setMessageAction(
                    memberRelation.errorMessage,
                    MESSAGE_TYPES.ERROR,
                    memberRelation.errorCode,
                    true
                )
            );
            document
                .querySelector("#transferMemberToMemberRelationModal")
                .querySelector(".modal-main")
                .firstChild.scrollTo(0, 0);
        }
    };

    const onReset = () => {
        form.reset();
        setItems(null);
        document
            .querySelector("#transferMemberToMemberRelationModal")
            .querySelector(".modal-main")
            .firstChild.scrollTo(0, 0);
    };

    const renderSearch = () => {
        return (
            <div className="block pd-20">
                <div className="field-title">{general.search}</div>
                <div>
                    <InputRow>
                        <InputTextColumn
                            field="nameTransferModal"
                            strings={strings}
                            useForm={form}
                            fullRow={false}
                            icon={"icon-personalcard4"}
                        />
                        <InputTextColumn
                            field="familyTransferModal"
                            strings={strings}
                            useForm={form}
                            fullRow={false}
                            icon={"icon-personalcard4"}
                        />
                    </InputRow>
                    <InputRow>
                        <InputTextColumn
                            field="nationalNoTransferModal"
                            textAlign="left"
                            strings={strings}
                            useForm={form}
                            fullRow={false}
                            icon={"icon-personalcard4"}
                        />
                        <InputTextColumn
                            field="cardNoTransferModal"
                            textAlign="left"
                            strings={strings}
                            useForm={form}
                            fullRow={false}
                            icon={"icon-personalcard4"}
                        />
                    </InputRow>
                </div>
                <div className="btns d-flex mt-10">
                    <button
                        className="btn btn-primary mx-rdir-10"
                        type="button"
                        disabled={layoutState?.loading}
                        title={general.search}
                        onClick={form.handleSubmit(onSubmit)}
                    >
                        {general.search}
                    </button>
                    <button
                        className="btn btn-border mx-rdir-10"
                        type="button"
                        disabled={layoutState?.loading}
                        title={general.reset}
                        onClick={onReset}
                    >
                        {general.reset}
                    </button>
                </div>
            </div>
        );
    };

    const renderHeader = () => (
        <tr>
            <th>{strings.namdeFamilyTransferModal}</th>
            <th style={{ maxWidth: "100px" }}>
                {strings.nationalNoTransferModal}
            </th>
            <th style={{ maxWidth: "100px" }}>{strings.cardNoTransferModal}</th>
        </tr>
    );

    const renderItems = () => {
        const children = items?.map((item) => {
            return (
                <React.Fragment key={item.id}>
                    <tr>
                        <td>
                            <CustomLink onClick={() => onSelect(item.id)}>
                                {`${item.name} ${item.family}`}
                            </CustomLink>
                        </td>
                        <td>{item.nationalNo}</td>
                        <td>{item.cardNo}</td>
                    </tr>
                </React.Fragment>
            );
        });

        return <TableItems columnsCount={columnsCount}>{children}</TableItems>;
    };

    return (
        <Modal
            id="transferMemberToMemberRelationModal"
            title={`${strings._title} [ ${layoutState?.shownModal?.props?.member?.name} ${layoutState?.shownModal?.props?.member?.family} - ${layoutState?.shownModal?.props?.member?.nationalNo} ]`}
            onClose={onClose}
            modalResult={modalResult}
        >
            <AlertState />
            <AlertMessage message={message} />
            {renderSearch()}
            <InputRow>
                <InputSelectColumn
                    field="relationship"
                    items={layoutState?.shownModal?.props?.relationships}
                    useForm={form}
                    fullRow={false}
                    strings={strings}
                />
            </InputRow>
            <h3 className="mt-20 mx-20 text">{strings.members}</h3>
            <div className="block">
                <Table renderHeader={renderHeader} renderItems={renderItems} />
            </div>
        </Modal>
    );
}

export default TransferMemberToMemberRelationModal;
