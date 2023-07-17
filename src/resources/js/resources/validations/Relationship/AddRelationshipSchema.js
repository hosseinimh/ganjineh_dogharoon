import * as yup from "yup";

import { stringValidator } from "../CommonValidators";
import { addRelationshipPage as strings } from "../../../constants/strings/fa";

const addRelationshipSchema = yup.object().shape({
  name: stringValidator(yup.string(), strings.name, 2, 50),
});

export default addRelationshipSchema;
