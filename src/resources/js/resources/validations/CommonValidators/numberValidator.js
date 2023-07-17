import { validation as strings } from "../../../constants/strings/fa";

const numberValidator = (
  schema,
  field,
  min = null,
  max = null,
  required = true
) => {
  schema = schema.typeError(strings.numberMessage.replace(":field", field));
  if (min) {
    schema = schema.min(
      min,
      strings.minNumberMessage.replace(":field", field).replace(":min", min)
    );
  }
  if (max) {
    schema = schema.max(
      max,
      strings.maxNumberMessage.replace(":field", field).replace(":max", max)
    );
  }
  if (required) {
    schema = schema.required(strings.requiredMessage.replace(":field", field));
  }
  return schema;
};

export default numberValidator;
