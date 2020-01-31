import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

/**
 * Enums
 */
import { Mode } from '../enums/mode.enum';

/**
 * Constants
 */
import { InputBoxConstant, Constants, CheckBoxConstant, RadioBoxConstant, DropBoxConstant, RuleJsonObjectConstant } from '../constants/constants';
import { ConditionsConstant } from '../constants/conditions';
import * as CONSTANT from '../constants/constants';

@Injectable()
export class FormBuilderSharedService {

    public formBuilderJson: any;
    public isAllowToDefaultInitializeData: boolean = true;

    constructor() {
        this.setDummyData();
    }

    /**
     * Set Dummy Data JSON
     */
    setDummyData() {
        this.formBuilderJson = {
            "mode": Mode[Mode.EDIT],
            "components": [
            ]
        }
    }

    /**
     * Add Input Box to Form Builder JSON
     * @param {any} inputBoxComponent [description]
     */
    addInputBox(inputBoxComponent: any) {
        if (inputBoxComponent != undefined) {
            inputBoxComponent.componentId = this.getUniqueComponentId();
            inputBoxComponent.componentData.componentGroups[0].componentGroupId = this.getUniqueComponentId();
            this.formBuilderJson.components[this.formBuilderJson.components.length] = inputBoxComponent;
        }
    }

    /**
     * Add check box to Form Bulder JSON
     * @param {any} checkBoxComponent [description]
     */
    addCheckBox(checkBoxComponent: any) {
        if (checkBoxComponent != undefined) {
            checkBoxComponent.componentId = this.getUniqueComponentId();
            checkBoxComponent.componentData.componentGroups[0].componentGroupId = this.getUniqueComponentId();
            this.formBuilderJson.components[this.formBuilderJson.components.length] = checkBoxComponent;
        }
    }

    /**
     * Add radio box to Form Bulder JSON
     * @param {[type]} radioBoxComponent [description]
     */
    addRadioBox(radioBoxComponent: any) {
        if (radioBoxComponent != undefined) {
            radioBoxComponent.componentId = this.getUniqueComponentId();
            radioBoxComponent.componentData.componentGroups[0].componentGroupId = this.getUniqueComponentId();
            this.formBuilderJson.components[this.formBuilderJson.components.length] = radioBoxComponent;
        }
    }

    /**
     * Add drop box to Form Builder JSON
     * @param {[type]} dropBoxComponent [description]
     */
    addDropBox(dropBoxComponent: any) {
        if (dropBoxComponent != undefined) {
            dropBoxComponent.componentId = this.getUniqueComponentId();
            dropBoxComponent.componentData.componentGroups[0].componentGroupId = this.getUniqueComponentId();
            this.formBuilderJson.components[this.formBuilderJson.components.length] = dropBoxComponent;
        }
    }

    /**
     * Add file upload box to Form Builder JSON
     * @param {any} fileUploadBoxComponent [description]
     */
    addFileUploadBox(fileUploadBoxComponent: any) {
        if (fileUploadBoxComponent != undefined) {
            fileUploadBoxComponent.componentId = this.getUniqueComponentId();
            fileUploadBoxComponent.componentData.componentGroups[0].componentGroupId = this.getUniqueComponentId();
            this.formBuilderJson.components[this.formBuilderJson.components.length] = fileUploadBoxComponent;
        }
    }

    /**
     * Add input type date box component to Form Builder JSON
     * @param {any} dateBoxComponent [description]
     */
    addDateBox(dateBoxComponent: any) {
        if (dateBoxComponent != undefined) {
            dateBoxComponent.componentId = this.getUniqueComponentId();
            dateBoxComponent.componentData.componentGroups[0].componentGroupId = this.getUniqueComponentId();
            this.formBuilderJson.components[this.formBuilderJson.components.length] = dateBoxComponent;
        }
    }

    /**
     * Remove component by componet Id
     * @param {any} componentId [description]
     */
    removeComponentByComponentId(componentToRemove: any) {
        if (componentToRemove != undefined)
            this.formBuilderJson.components = this.formBuilderJson.components.filter(component => component.componentId !== componentToRemove.componentId);

        //To remove specific rule which had this removed component as dependant component
        for (let i = 0; i < this.formBuilderJson.components.length; i++) {

            //Check if rules more than 1 then remove it
            //And if rule equals 1 then uncheck isRuleEnable
            if (this.formBuilderJson.components[i].rulesData.rules.length === 1) {
                this.formBuilderJson.components[i].isRuleEnable = false;
                CONSTANT.refreshCheckboxByClass('enableRuleCheckBox');
            }

            this.formBuilderJson.components[i].rulesData.rules = this.formBuilderJson.components[i].rulesData.rules.filter(rule => rule.dependantComponentId === componentToRemove.componentId);
        }
    }

    /**
     * Add more check box to checkbox group
     */
    addCheckboxToGroup(componentGroup: any) {
        if (componentGroup != undefined) {
            let checkBox: any = new CheckBoxConstant().CHECK_BOX_CONSTANT.componentData.componentGroups[0];
            checkBox.componentGroupId = this.getUniqueComponentId();
            componentGroup.componentData.componentGroups[componentGroup.componentData.componentGroups.length] = checkBox;
        }
    }

    /**
     * Add more radio box to radiobox group
     */
    addRadioboxToGroup(componentGroup: any) {
        if (componentGroup != undefined) {
            let radioBox: any = new RadioBoxConstant().RADIO_BOX_CONSTANT.componentData.componentGroups[0];
            radioBox.componentGroupId = this.getUniqueComponentId();
            componentGroup.componentData.componentGroups[componentGroup.componentData.componentGroups.length] = radioBox;
        }
    }

    /**
     * Add more dropdown option to dropbox
     * @param {any} componentGroup [description]
     */
    addDropdownOptionToGroup(componentGroup: any) {
        if (componentGroup != undefined) {
            let dropBox: any = new DropBoxConstant().DROP_BOX_CONSTANT.componentData.componentGroups[0];
            dropBox.componentGroupId = this.getUniqueComponentId();
            componentGroup.componentData.componentGroups[componentGroup.componentData.componentGroups.length] = dropBox;
        }
    }

    /**
     * Remove checkbox from checkbox group in FormBuilder JSON
     * @param {any} componentGroup [description]
     * @param {any} loopIndex      [description]
     */
    removeElementBoxFromGroup(componentGroup: any, loopIndex: any) {
        if (componentGroup != undefined && loopIndex != undefined) {
            componentGroup.componentData.componentGroups.splice(loopIndex, 1);
        }
    }

    /**
     * Add new rule on plus button click
     * @param {any} ruleComponent [description]
     */
    addNewRule(ruleComponent: any) {
        if (ruleComponent != undefined) {
            let conditionsConstant = new ConditionsConstant();
            let newRule: any = new RuleJsonObjectConstant().RULE_JSON_OBJECT_CONSTANT;
            newRule.ruleId = this.getUniqueComponentId();
            newRule.dependantComponentId = this.formBuilderJson.components[0].componentId;
            newRule.condition = conditionsConstant.DEFAULT_CONDITION_MODEL.condition;
            if (this.formBuilderJson.components[0].component == 'InputBoxComponent') {
                newRule.value = '';
            } else {
                newRule.value = "-1";
            }
            ruleComponent.rulesData.rules[ruleComponent.rulesData.rules.length] = newRule;
        }
    }

    /**
     * Remove rule on minus icon click
     * @param {any} ruleComponent [description]
     * @param {any} ruleIndex     [description]
     */
    removeRule(ruleComponent: any, ruleIndex: any) {
        if (ruleComponent != undefined && ruleIndex != undefined) {
            ruleComponent.rulesData.rules.splice(ruleIndex, 1);
        }
    }

    /**
     * Get current index of component by component Id 
     * @param  {string} componentId [description]
     * @return {number}             [description]
     */
    getIndexByComponentId(componentId: string): number {

        for (let i = 0; i < this.formBuilderJson.components.length; i++) {
            if (componentId == this.formBuilderJson.components[i].componentId)
                return i;
        }
    }

    /**
     * Get component by component id
     * @param {any} componentId [description]
     */
    getComponentByComponentId(componentId: any) {
        for (let i = 0; i < this.formBuilderJson.components.length; i++) {
            if (componentId == this.formBuilderJson.components[i].componentId)
                return this.formBuilderJson.components[i];
        }
    }

    /**
     * Generate unique id for component
     * @return {number} [description]
     */
    getUniqueComponentId(): number {
        return new Date().getTime();
    }

    /**
     * Change json objects mode
     * @param {Mode} mode [description]
     */
    changeJsonMode(mode: Mode) {
        this.formBuilderJson.mode = Mode[mode];
    }

    /**
     * Toggle is allow to default initialize
     * @param {boolean} flag [description]
     */
    toggleIsAllowToDefaultInitializeData(flag: boolean) {
        this.isAllowToDefaultInitializeData = flag;
    }
}