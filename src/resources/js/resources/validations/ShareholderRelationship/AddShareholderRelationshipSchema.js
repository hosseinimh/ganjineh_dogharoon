import * as yup from "yup";

import {
  stringValidator,
  numberValidator,
  nationalNoValidator,
  nameValidator,
} from "../CommonValidators";
import { addShareholderRelationshipsPage as strings } from "../../../constants/strings/fa";

const addShareholderRelationshipSchema = yup.object().shape({
  name: nameValidator(yup.string(), strings.name, 3, 50),
  family: nameValidator(yup.string(), strings.family, 3, 50),
  nationalCode: nationalNoValidator(yup.string(), strings.nationalCode),
  identityNo: numberValidator(yup.number(), strings.identityNo, 1, 99999999),
  mobile: numberValidator(yup.number(), strings.mobile, 1, 99999999),
  shareholderRelationship: stringValidator(
    yup.string(),
    strings.shareholderRelationship,
    3,
    50
  ),
  tel: numberValidator(yup.number(), strings.tel, 1, 99999999),
});

export default addShareholderRelationshipSchema;
