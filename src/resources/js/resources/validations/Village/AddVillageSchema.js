import * as yup from "yup";

import { numberValidator, stringValidator } from "../CommonValidators";
import { addVillagePage as strings } from "../../../constants/strings/fa";

const addVillageSchema = yup.object().shape({
    district: numberValidator(yup, strings.district),
    name: stringValidator(yup.string(), strings.name, 2, 50),
});

export default addVillageSchema;
