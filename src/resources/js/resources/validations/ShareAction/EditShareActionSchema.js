import * as yup from "yup";

import {
    stringValidator,
    numberValidator,
    dateValidator,
} from "../CommonValidators";
import { editShareActionPage as strings } from "../../../constants/strings/fa";

const editShareActionSchema = yup.object().shape({
    actionDate: dateValidator(yup.string(), strings.actionDate),
    actionType: numberValidator(yup, strings.actionType, 1, 2),
    count: numberValidator(yup, strings.count, 1, 20),
    description: stringValidator(
        yup.string(),
        strings.description,
        null,
        300,
        false
    ),
});

export default editShareActionSchema;
