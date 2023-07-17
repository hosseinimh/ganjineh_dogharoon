import * as yup from "yup";

import { stringValidator } from "../CommonValidators";
import { addBankPage as strings } from "../../../constants/strings/fa";

const addBankSchema = yup.object().shape({
  name: stringValidator(yup.string(), strings.name, 2, 50),
});

export default addBankSchema;
