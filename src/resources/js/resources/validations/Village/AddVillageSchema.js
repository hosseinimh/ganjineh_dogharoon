import * as yup from "yup";

import { numberValidator, stringValidator } from "../CommonValidators";
import {
    addVillagePage as strings,
    validation,
} from "../../../constants/strings/fa";

const districtMessage = validation.requiredMessage.replace(
    ":field",
    strings.district
);

const addVillageSchema = yup.object().shape({
    district: numberValidator(
        yup,
        strings.district,
        1,
        2,
        true,
        districtMessage,
        districtMessage
    ),
    name: stringValidator(yup.string(), strings.name, 2, 50),
});

export default addVillageSchema;
