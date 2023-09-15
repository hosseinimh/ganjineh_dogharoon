import * as yup from "yup";

import { numberValidator, stringValidator } from "../CommonValidators";
import { editVillagePage as strings } from "../../../constants/strings/fa";

const editVillageSchema = yup.object().shape({
    district: numberValidator(yup, strings.district),
    name: stringValidator(yup.string(), strings.name, 2, 50),
});

export default editVillageSchema;
