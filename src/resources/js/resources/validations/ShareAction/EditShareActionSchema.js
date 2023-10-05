import * as yup from "yup";

import {
    stringValidator,
    numberValidator,
    dateValidator,
} from "../CommonValidators";
import {
    editShareActionPage as strings,
    validation,
} from "../../../constants/strings/fa";

const bankMessage = validation.requiredMessage.replace(":field", strings.bank);

const editShareActionSchema = yup.object().shape({
    actionDate: dateValidator(yup.string(), strings.actionDate),
    transactionDate: dateValidator(
        yup.string(),
        strings.transactionDate,
        false
    ),
    bank: numberValidator(
        yup,
        strings.bank,
        null,
        null,
        false,
        bankMessage,
        bankMessage
    ),
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

export default editShareActionSchema;
