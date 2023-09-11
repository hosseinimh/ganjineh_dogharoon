import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Member as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { transferToNewMemberSchema as schema } from "../../../validations";
import { transferToNewMemberModal as strings } from "../../../../constants/strings/fa";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm({
            resolver: yupResolver(schema),
        });
        super("TransferToNewMemberModal", strings, form);
        this.entity = new Entity();
        this.initialPageProps = {
            pageNumber: 1,
            item: null,
            items: null,
            action: null,
        };
    }

    onLoad() {
        super.onLoad();
    }

    async onSubmit(data) {
        const promise = this.entity.store(data.name);
        super.onModifySubmit(promise);
    }
}
