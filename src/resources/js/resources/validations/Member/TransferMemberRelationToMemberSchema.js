import * as yup from "yup";

import {
    stringValidator,
    numberValidator,
    nameValidator,
    dateValidator,
} from "../CommonValidators";
import { transferMemberRelationToMemberPage as strings } from "../../../constants/strings/fa";

const transferMemberRelationToMemberSchema = yup.object().shape({
    fatherName: nameValidator(yup.string(), strings.fatherName, 2, 50),
    membershipDate: dateValidator(yup.string(), strings.membershipDate),
    postalCode: numberValidator(yup, strings.postalCode, 0, 9999999999, false),
    village: numberValidator(yup, strings.village, 1, null, true),
    tel: stringValidator(yup.string(), strings.tel, null, 50, false),
    mobile: stringValidator(yup.string(), strings.mobile, null, 50, false),
    address: stringValidator(yup.string(), strings.address, null, 300, false),
    description: stringValidator(
        yup.string(),
        strings.description,
        null,
        300,
        false
    ),
    cardNo: numberValidator(yup, strings.cardNo, 1, null, true),
});

export default transferMemberRelationToMemberSchema;
