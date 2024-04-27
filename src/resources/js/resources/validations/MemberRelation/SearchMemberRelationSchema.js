import * as yup from "yup";

import { nameValidator, numberValidator } from "../CommonValidators";
import { memberRelationsAllPage as strings } from "../../../constants/strings/fa";

const searchMemberRelationSchema = yup.object().shape({
    name: nameValidator(yup.string(), strings.name, null, 50, false),
    family: nameValidator(yup.string(), strings.family, null, 50, false),
    nationalNo: numberValidator(
        yup,
        strings.nationalNo,
        null,
        9999999999,
        false
    ),
    cardNo: numberValidator(yup, strings.cardNo, null, 999999, false),
});

export default searchMemberRelationSchema;
