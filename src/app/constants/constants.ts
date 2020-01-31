import { InputType, InputTypeConstant } from './inputType';

//To use jquery
declare var $: any;

export class Constants {

    public DATE_FORMATE = 'MM/dd/yyyy h:mm a';
}

export class InputBoxConstant {

    public INPUT_BOX_CONSTANT = {
        "component": "InputBoxComponent",
        "componentId": "",
        "componentData": {
            "question": {
                "placeholder": "Please enter label name",
                "name": "LabelInputNameAttribute",
                "model": "",
            },
            "componentGroups": [
                {
                    "componentGroupId": "",
                    "label": {
                        "placeholderAttr": {
                            "model": "",
                            "placeholder": "Enter your custom placeholder",
                            "name": "Inputbox_Custom_Placeholder_Attribute_Name"
                        },
                        "requiredAttr": {
                            "model": false,
                            "name": "Inputbox_Required_Attribute_Name",
                            "label": "Is required ?"
                        },
                        "inputTypeAttr": {
                            "selectedInputType": ""
                        }
                    },
                    "inputBox": {
                        "placeholder": "Please enter value",
                        "name": "InputTextNameAttribute",
                        "model": ""
                    }
                }
            ]
        },
        "isRuleEnable": false,
        "rulesData": {
            "isAllRulesSatisfied": false,
            "matchType": "",
            "defaultState": "",
            "finalState": "",
            "rules": [
            ]
        }
    };
}

export class CheckBoxConstant {
    public CHECK_BOX_CONSTANT = {
        "component": "CheckBoxComponent",
        "componentId": "",
        "componentData": {
            "question": {
                "placeholder": "Please enter check-box question",
                "name": "LabelCheckBoxQuestionAttribute",
                "model": ""
            },
            "componentGroups": [
                {
                    "componentGroupId": "",
                    "checkbox": {
                        "name": "LabelInputNameAttribute",
                        "model": ""
                    },
                    "label": {
                        "placeholder": "Please enter check button name",
                        "name": "LabelInputNameAttribute",
                        "model": ""
                    }
                }
            ]
        },
        "isRuleEnable": false,
        "rulesData": {
            "isAllRulesSatisfied": false,
            "matchType": "",
            "defaultState": "",
            "finalState": "",
            "rules": [
            ]
        }
    };
}

export class RadioBoxConstant {
    public RADIO_BOX_CONSTANT = {
        "component": "RadioBoxComponent",
        "componentId": "",
        "componentData": {
            "question": {
                "placeholder": "Please enter radio-box question",
                "name": "LabelRadioBoxQuestionAttribute",
                "model": ""
            },
            "selectedOption": "",
            "componentGroups": [
                {
                    "componentGroupId": "",
                    "radiobox": {
                        "name": "LabelInputNameAttribute",
                        "model": ""
                    },
                    "label": {
                        "placeholder": "Please enter radio button name",
                        "name": "LabelInputNameAttribute",
                        "model": ""
                    }
                }
            ]
        },
        "isRuleEnable": false,
        "rulesData": {
            "isAllRulesSatisfied": false,
            "matchType": "",
            "defaultState": "",
            "finalState": "",
            "rules": [
            ]
        }
    };
}

export class DropBoxConstant {
    public DROP_BOX_CONSTANT = {
        "component": "DropBoxComponent",
        "componentId": "",
        "componentData": {
            "question": {
                "placeholder": "Please enter drop-down name",
                "name": "LabelDropBoxQuestionAttribute",
                "model": ""
            },
            "selectedOption": "",//This is value of 'componentGroups > componentGroupId'
            "componentGroups": [
                {
                    "componentGroupId": "",
                    "option": {
                        "placeholder": "Please enter option",
                        "name": "LabelInputNameAttribute",
                        "model": ""
                    }
                }
            ]
        },
        "isRuleEnable": false,
        "rulesData": {
            "isAllRulesSatisfied": false,
            "matchType": "",
            "defaultState": "",
            "finalState": "",
            "rules": [
            ]
        }
    };
}

export class FileUploadBoxConstant {
    public FILE_UPLOAD_BOX_CONSTANT = {
        "component": "FileUploadBoxComponent",
        "componentId": "",
        "componentData": {
            "question": {
                "placeholder": "Please enter label name",
                "name": "LabelFileUploadNameAttribute",
                "model": "",
            },
            "componentGroups": [
                {
                    "componentGroupId": "",
                    "label": {
                        "requiredAttr": {
                            "model": false,
                            "name": "Inputbox_Required_Attribute_Name",
                            "label": "Is required ?"
                        },
                        "fileUploadTypeAttr": {
                            "selectedFileType": ""
                        }
                    },
                    "fileUploadBox": {
                        "placeholder": "Please enter value",
                        "name": "FileTypeNameAttribute",
                        "model": ""
                    }
                }
            ]
        },
        "isRuleEnable": false,
        "rulesData": {
            "isAllRulesSatisfied": false,
            "matchType": "",
            "defaultState": "",
            "finalState": "",
            "rules": [
            ]
        }
    };
}

export class DateBoxConstant {
    public DATE_BOX_CONSTANT = {
        "component": "DateBoxComponent",
        "componentId": "",
        "componentData": {
            "question": {
                "placeholder": "Please enter label name",
                "name": "LabelDateNameAttribute",
                "model": "",
            },
            "componentGroups": [
                {
                    "componentGroupId": "",
                    "label": {
                        "requiredAttr": {
                            "model": false,
                            "name": "Datebox_Required_Attribute_Name",
                            "label": "Is required ?"
                        },
                        "selectedFormate": {
                            "model": '',
                            "name": "Datebox_Formate_Attribute_Name"
                        },
                        "minDate": {
                            "model": '',
                            "name": "Datebox_Mindate_Attribute_Name"
                        },
                        "maxDate": {
                            "model": '',
                            "name": "Datebox_Maxdate_Attribute_Name"
                        }
                    },
                    "dateBox": {
                        "placeholder": "Please select date",
                        "name": "DateNameAttribute",
                        "model": ""
                    }
                }
            ]
        },
        "isRuleEnable": false,
        "rulesData": {
            "isAllRulesSatisfied": false,
            "matchType": "",
            "defaultState": "",
            "finalState": "",
            "rules": [
            ]
        }
    };
}

export class RuleJsonObjectConstant {
    public RULE_JSON_OBJECT_CONSTANT = {
        "ruleId": "",
        "dependantComponentId": "",
        "condition": "",
        "value": "",
        "isRuleSatisfied": false
    }
}

/**
 * Only number key
 */
export function onlyNumberKey(event: any, inputTypeString: string): any {

    if (!inputTypeString || inputTypeString === undefined || inputTypeString === '')
        inputTypeString = new InputTypeConstant().DEFAULT_INPUT_TYPE_MODEL.inputType;

    let inputType: InputType = InputType[inputTypeString];

    switch (inputType) {

        //Allows positive numbers only without decimal
        case InputType.ONLY_NUMERIC: {

            if (event.which != 8 && event.which != 0 && (event.which < 48 || event.which > 57))
                return false;
            return true;
        }

        //Allows characters with numbers
        case InputType.ALPHA_NUMERIC: {
            return true;
        }
    }

}

/**
 * Refresh checkbox by class
 */
export function refreshCheckboxByClass(className: string) {

    setTimeout(function() {

        $("." + className).each(function() {

            if ($(this).attr('checked') === undefined)
                $(this).prop('checked', false);
            else
                $(this).prop('checked', true);
        });

    }, 10);
}