import * as yup from "yup";

import {
    numberValidator,
    nameValidator,
    nationalNoValidator,
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
    cardNoTransferModal: numberValidator(
        yup,
        strings.cardNoTransferModal,
        null,
        1000000,
        false
    ),
});

export default transferMemberRelationToNewMemberSchema;
