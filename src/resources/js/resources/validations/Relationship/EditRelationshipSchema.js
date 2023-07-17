import * as yup from "yup";

import { stringValidator } from "../CommonValidators";
import { editRelationshipPage as strings } from "../../../constants/strings/fa";

const editRelationshipSchema = yup.object().shape({
  name: stringValidator(yup.string(), strings.name, 2, 50),
});

export default editRelationshipSchema;
