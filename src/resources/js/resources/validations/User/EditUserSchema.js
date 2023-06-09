import * as yup from "yup";
import {
    validation,
    editUserPage as strings,
} from "../../../constants/strings";

const editUserSchema = yup.object().shape({
    name: yup
        .string(validation.stringMessage.replace(":field", strings.name))
        .min(
            3,
            validation.minMessage
                .replace(":field", strings.name)
                .replace(":min", "3")
        )
        .max(
            50,
            validation.maxMessage
                .replace(":field", strings.name)
                .replace(":max", "50")
        )
        .required(validation.requiredMessage.replace(":field", strings.name)),
    family: yup
        .string(validation.stringMessage.replace(":field", strings.family))
        .min(
            3,
            validation.minMessage
                .replace(":field", strings.family)
                .replace(":min", "3")
        )
        .max(
            50,
            validation.maxMessage
                .replace(":field", strings.family)
                .replace(":max", "50")
        )
        .required(validation.requiredMessage.replace(":field", strings.family)),
    mobile: yup
        .string(validation.stringMessage.replace(":field", strings.mobile))
        .matches(
            /^[0-9]{11}$/,
            validation.exactDigitMessage
                .replace(":field", strings.mobile)
                .replace(":digit", "11")
        )
        .required(validation.requiredMessage.replace(":field", strings.mobile)),
});

export default editUserSchema;
