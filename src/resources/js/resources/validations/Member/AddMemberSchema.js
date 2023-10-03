import * as yup from "yup";

import {
    stringValidator,
    numberValidator,
    nationalNoValidator,
    nameValidator,
    dateValidator,
} from "../CommonValidators";
import { addMemberPage as strings } from "../../../constants/strings/fa";

const addMemberSchema = yup.object().shape({
    name: nameValidator(yup.string(), strings.name, 2, 50),
    family: nameValidator(yup.string(), strings.family, 2, 50),
    nationalNo: nationalNoValidator(yup.string(), strings.nationalNo),
    identityNo: numberValidator(yup, strings.identityNo, 0, 1000000),
    fatherName: nameValidator(yup.string(), strings.fatherName, 2, 50),
    birthDate: dateValidator(yup.string(), strings.birthDate),
    membershipDate: dateValidator(yup.string(), strings.membershipDate),
    postalCode: numberValidator(yup, strings.postalCode, 0, 9999999999, false),
    gender: numberValidator(yup, strings.gender, 1, 2, true),
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
    cardNo: numberValidator(yup, strings.cardNo, 1, null),
});

export default addMemberSchema;
