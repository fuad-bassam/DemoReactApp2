import Joi from "joi";
import { fieldTypesEnum, textFieldTypesEnum } from "../../store/CommonEnums";
import ILOVItem from "./ILOVItem";

export interface IDynamicFormStep {
    step: number;
    fields: IDynamicFormFields[];
    validationSchema: Joi.ObjectSchema<any>;
    initialValidationState: any;
}
export interface IDynamicFormFields {
    name: string;
    label: string;
    fieldType?: fieldTypesEnum;
    required?: boolean;
    disabled?: boolean;
    textFieldType?: textFieldTypesEnum;
    LOVDataHandler?: () => Promise<ILOVItem[]>; // API method to fetch options
}

