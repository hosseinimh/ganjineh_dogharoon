import * as yup from "yup";

import {
    stringValidator,
    numberValidator,
    nationalNoValidator,
    nameValidator,
} from "../CommonValidators";
import { editShareholderRelationshipsPage as strings } from "../../../constants/strings/fa";

const editShareholderRelationshipSchema = yup.object().shape({
    name: nameValidator(yup.string(), strings.name, 3, 50),
    family: nameValidator(yup.string(), strings.family, 3, 50),
    nationalCode: nationalNoValidator(yup.string(), strings.nationalCode),
    identityNo: numberValidator(yup, strings.identityNo, 1, 99999999),
    mobile: numberValidator(yup, strings.mobile, 1, 99999999),
    shareholderRelationship: stringValidator(
        yup.string(),
        strings.shareholderRelationship,
        3,
        50
    ),
    tel: numberValidator(yup, strings.tel, 1, 99999999),
});

export default editShareholderRelationshipSchema;
