import * as yup from "yup";

import { nameValidator, stringValidator } from "../CommonValidators";
import { membersPage as strings } from "../../../constants/strings/fa";

const searchMemberSchema = yup.object().shape({
  name: nameValidator(yup.string(), strings.name, null, 50, false),
  family: nameValidator(yup.string(), strings.family, null, 50, false),
  nationalNo: stringValidator(
    yup.string(),
    strings.nationalNo,
    null,
    10,
    false
  ),
  cardNo: stringValidator(yup.string(), strings.cardNo, null, 6, false),
});

export default searchMemberSchema;