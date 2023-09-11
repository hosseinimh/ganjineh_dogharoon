import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
    general,
    transferToNewMemberModal as strings,
} from "../../../../constants/strings/fa";
import {
    Modal,
    InputTextColumn,
    InputRow,
    AlertMessage,
    Table,
    TableItems,
    CustomLink,
} from "../../";
import { transferToNewMemberSchema as schema } from "../../../validations";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import { clearMessageAction } from "../../../../state/message/messageActions";
import { Member as Entity, MemberRelation } from "../../../../http/entities";

function TransferToNewMemberModal() {
    const layoutState = useSelector((state) => state.layoutReducer);
    const dispatch = useDispatch();
    const [closeModal, setCloseModal] = useState(undefined);
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
                    .querySelector("#transferToNewMemberModal")
                    .querySelector(".modal-main")
                    .firstChild.scrollTo(0, 0);
            }
        }
    }, [form?.formState?.errors]);

    useEffect(() => {
        if (closeModal === true) {
            setCloseModal(undefined);
        }
    }, [closeModal]);

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
        await memberRelation.changeMember(
            layoutState?.shownModal?.props?.memberRelation?.id,
            memberId
        );
        dispatch(setLoadingAction(false));
        setCloseModal(true);
        if (
            typeof layoutState?.shownModal?.props?.onCloseModal === "function"
        ) {
            layoutState?.shownModal?.props?.onCloseModal(true);
        }
    };

    const onReset = () => {
        form.reset();
        setItems(null);
        document
            .querySelector("#transferToNewMemberModal")
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
            id="transferToNewMemberModal"
            title={`${strings._title} - [ ${layoutState?.shownModal?.props?.memberRelation?.name} ${layoutState?.shownModal?.props?.memberRelation?.family} ]`}
            onClose={onClose}
            closeModal={closeModal}
        >
            <AlertMessage message={message} />
            {renderSearch()}
            <h3 className="mt-20 mx-20 text">{strings.members}</h3>
            <div className="block">
                <Table renderHeader={renderHeader} renderItems={renderItems} />
            </div>
        </Modal>
    );
}

export default TransferToNewMemberModal;
