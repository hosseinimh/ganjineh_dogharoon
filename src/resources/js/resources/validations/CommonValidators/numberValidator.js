import { validation } from "../../../constants/strings/fa";

const numberValidator = (
    schema,
    field,
    min = null,
    max = null,
    required = true
) => {
    let result = null;
    if (required) {
        result = schema
            .number(validation.numberMessage.replace(":field", field))
            .required(validation.requiredMessage.replace(":field", field));
    }
    if (!result && min) {
        result = schema
            .number()
            .min(
                min,
                validation.minNumberMessage
                    .replace(":field", field)
                    .replace(":min", min)
            );
    }
    if (!result && max) {
        result = schema
            .number()
            .max(
                max,
                validation.maxNumberMessage
                    .replace(":field", field)
                    .replace(":max", max)
            );
    }

    return result ?? schema.string();
};

export default numberValidator;
