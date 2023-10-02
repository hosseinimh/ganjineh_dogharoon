import * as yup from "yup";

import {
    nameValidator,
    nationalNoValidator,
    stringValidator,
} from "../CommonValidators";
import { transferMemberRelationToNewMemberModal as strings } from "../../../constants/strings/fa";

const transferMemberRelationToNewMemberSchema = yup.object().shape({
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
    cardNoTransferModal: stringValidator(
        yup.string(),
        strings.cardNoTransferModal,
        null,
        6,
        false
    ),
});

export default transferMemberRelationToNewMemberSchema;
