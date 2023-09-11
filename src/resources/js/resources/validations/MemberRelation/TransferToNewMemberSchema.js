import * as yup from "yup";

import {
    numberValidator,
    nationalNoValidator,
    nameValidator,
} from "../CommonValidators";
import { editMemberRelationPage as strings } from "../../../constants/strings/fa";

const transferToNewMemberSchema = yup.object().shape({
    name: nameValidator(yup.string(), strings.name, null, 50, false),
    family: nameValidator(yup.string(), strings.family, null, 50, false),
    nationalNo: nationalNoValidator(yup.string(), strings.nationalNo, false),
    cardNo: numberValidator(yup.number(), strings.cardNo, null, 1000000, false),
});

export default transferToNewMemberSchema;
