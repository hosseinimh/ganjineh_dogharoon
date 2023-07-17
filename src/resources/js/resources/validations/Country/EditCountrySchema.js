import * as yup from "yup";

import { stringValidator } from "../CommonValidators";
import { editCountryPage as strings } from "../../../constants/strings/fa";

const editCountrySchema = yup.object().shape({
  name: stringValidator(yup.string(), strings.name, 2, 50),
});

export default editCountrySchema;
