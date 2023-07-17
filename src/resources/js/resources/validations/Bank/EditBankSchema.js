import * as yup from "yup";

import { stringValidator } from "../CommonValidators";
import { editBankPage as strings } from "../../../constants/strings/fa";

const editBankSchema = yup.object().shape({
  name: stringValidator(yup.string(), strings.name, 2, 50),
});

export default editBankSchema;
