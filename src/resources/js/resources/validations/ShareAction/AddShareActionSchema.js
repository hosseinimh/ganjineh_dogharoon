import * as yup from "yup";

import {
    stringValidator,
    numberValidator,
    dateValidator,
} from "../CommonValidators";
import {
    addShareActionPage as strings,
    validation,
} from "../../../constants/strings/fa";

const actionTypeMessage = validation.requiredMessage.replace(
    ":field",
    strings.actionType
);

const addShareActionSchema = yup.object().shape({
    actionDate: dateValidator(yup.string(), strings.actionDate),
    actionType: numberValidator(
        yup,
        strings.actionType,
        1,
        3,
        actionTypeMessage,
        actionTypeMessage
    ),
    transactionDate: dateValidator(
        yup.string(),
        strings.transactionDate,
        false
    ),
    bank: numberValidator(yup, strings.bank, null, null, false),
    invoiceNo: stringValidator(
        yup.string(),
        strings.invoiceNo,
        null,
        50,
        false
    ),
    price: numberValidator(yup, strings.price, null, 100000000, false),
    description: stringValidator(
        yup.string(),
        strings.description,
        null,
        300,
        false
    ),
});

export default addShareActionSchema;
