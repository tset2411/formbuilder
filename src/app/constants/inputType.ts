import { EnumValues } from 'enum-values';

/**
 * Input type enums
 */
export enum InputType {

    ALPHA_NUMERIC,
    ONLY_NUMERIC
}

/**
 * Pattern constant
 */
export class InputTypePatternConstant {
    public static ONLY_NUMERIC_PATTERN = "[0-9]+";
    public static ALPHA_NUMERIC_PATTERN = "[a-z\sA-Z\s0-9]+"
}


/**
 * Input type model class
 */
export class InputTypeModel {

    inputType: string;
    label: string;
    pattern: any;
}

/**
 * Input type constant class
 */
export class InputTypeConstant {

    /**
     * Default alpha numaric condition model
     * @param {[type]} InputType[InputType.ALPHA_NUMERIC [description]
     */
    public readonly DEFAULT_INPUT_TYPE_MODEL: InputTypeModel = this.getInputTypeModelByInputType(InputType[InputType.ALPHA_NUMERIC]);

    /**
     * Get input type model by input type
     * @param  {string}         inputType [description]
     * @return {InputTypeModel}           [description]
     */
    getInputTypeModelByInputType(inputType: string): InputTypeModel {

        let inputTypeModel: InputTypeModel = CONDITION_MODELS.filter(conditonModelObject => conditonModelObject.inputType === inputType)[0];
        return inputTypeModel;
    }

    /**
     * Get All enums value as list
     */
    getAllInputTypes(): any[] {

        return EnumValues.getNamesAndValues(InputType);
    }
}

/**
 * Condition models
 * @type {InputTypeModel[]}
 */
const CONDITION_MODELS: InputTypeModel[] = [
    {
        inputType: InputType[InputType.ALPHA_NUMERIC],
        label: "Alpha Numaric",
        pattern: InputTypePatternConstant.ALPHA_NUMERIC_PATTERN
    },
    {
        inputType: InputType[InputType.ONLY_NUMERIC],
        label: "Only Numaric",
        pattern: InputTypePatternConstant.ONLY_NUMERIC_PATTERN
    }
];