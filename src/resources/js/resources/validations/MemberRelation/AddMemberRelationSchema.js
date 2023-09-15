import * as yup from "yup";

import {
    stringValidator,
    numberValidator,
    nationalNoValidator,
    nameValidator,
    dateValidator,
} from "../CommonValidators";
import { addMemberRelationPage as strings } from "../../../constants/strings/fa";

const addMemberRelationSchema = yup.object().shape({
    name: nameValidator(yup.string(), strings.name, 2, 50),
    family: nameValidator(yup.string(), strings.family, 2, 50),
    nationalNo: nationalNoValidator(yup.string(), strings.nationalNo),
    identityNo: numberValidator(yup, strings.identityNo, 0, 1000000),
    birthDate: dateValidator(yup.string(), strings.birthDate),
    gender: numberValidator(yup, strings.gender, 1, 2, true),
    relationship: numberValidator(yup, strings.relationship, 1, null, true),
    description: stringValidator(
        yup.string(),
        strings.description,
        null,
        300,
        false
    ),
});

export default addMemberRelationSchema;
