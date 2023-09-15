import * as yup from "yup";

import {
    numberValidator,
    nameValidator,
    nationalNoValidator,
} from "../CommonValidators";
import { transferMemberToMemberRelationModal as strings } from "../../../constants/strings/fa";

const transferMemberToMemberRelationSchema = yup.object().shape({
    nameTransferModal: nameValidator(
        yup.string(),
        strings.nameTransferModal,
        null,
        50,
        false
    ),
    familyTransferModal: nameValidator(
        yup.string(),
        strings.familyTransferModal,
        null,
        50,
        false
    ),
    nationalNoTransferModal: nationalNoValidator(
        yup.string(),
        strings.nationalNoTransferModal,
        false
    ),
    cardNoTransferModal: numberValidator(
        yup,
        "strings.cardNoTransferModal",
        null,
        null,
        false
    ),
});

export default transferMemberToMemberRelationSchema;
