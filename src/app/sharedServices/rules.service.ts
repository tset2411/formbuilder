import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

/**
 * Services
 */
import { FormBuilderSharedService } from './formBuilderSharedService.service';

/**
 * Enums
 */
import { Mode } from '../enums/mode.enum';
import { DynamicComponentsEnum } from '../enums/dynamicComponents.enum';
import { MatchType } from '../constants/matchType';


/**
 * Constants
 */
import { InputBoxConstant, Constants, CheckBoxConstant, RadioBoxConstant, DropBoxConstant, RuleJsonObjectConstant } from '../constants/constants';
import { ConditionsConstant, ConditionsEnum } from '../constants/conditions';
import { ComponentState } from '../constants/componentState';

import * as CONSTANT from '../constants/constants';

//To use jquery
declare var $: any;

@Injectable()
export class RulesService {

    constructor(
        public formBuilderSharedService: FormBuilderSharedService) {
    }

    /**
     * Process to check and varify applied rules from currentComponentId and value
     * @param {[type]} currentComponentId [description]
     * @param {[type]} currentValue       [description]
     */
    processToVerifyRules(currentComponent: any) {

        //Loop on components
        for (var i = 0; i < this.formBuilderSharedService.formBuilderJson.components.length; i++) {

            let matchType: string = this.formBuilderSharedService.formBuilderJson.components[i].rulesData.matchType;

            //variable for make all rule satisfied
            let isAllRulesSatisfied = false;

            //When there rules enabled
            //and had matchType all 
            //then we have to make isAllRulesSatisfied variable true by default
            //because it will be false further when there any of rule is false
            if (this.formBuilderSharedService.formBuilderJson.components[i].isRuleEnable &&
                matchType === MatchType[MatchType.ALL]) {
                isAllRulesSatisfied = true;
            }

            //Loop on all rules
            for (var j = 0; j < this.formBuilderSharedService.formBuilderJson.components[i].rulesData.rules.length; j++) {

                //Check dependentComponentId with current componentId    
                if (this.formBuilderSharedService.formBuilderJson.components[i].rulesData.rules[j].dependantComponentId == currentComponent.componentId) {

                    //Check condition and rule value is not undefined
                    if (this.formBuilderSharedService.formBuilderJson.components[i].rulesData.rules[j].condition != undefined &&
                        this.formBuilderSharedService.formBuilderJson.components[i].rulesData.rules[j].value != undefined) {

                        let componentName: string = currentComponent.component;
                        let dynamicComponentsEnum: DynamicComponentsEnum = DynamicComponentsEnum[componentName];

                        //Switch case to check current component type
                        switch (dynamicComponentsEnum) {

                            case DynamicComponentsEnum.InputBoxComponent: {

                                //call function for match inputbox value
                                let isRuleSatisfied: boolean = this.matchRuleForInputBox(this.formBuilderSharedService.formBuilderJson.components[i].rulesData.rules[j], currentComponent);
                                this.formBuilderSharedService.formBuilderJson.components[i].rulesData.rules[j].isRuleSatisfied = isRuleSatisfied;
                                break;
                            }

                            case DynamicComponentsEnum.CheckBoxComponent: {

                                //call function for match checkbox value
                                let isRuleSatisfied: boolean = this.matchRuleForCheckBox(this.formBuilderSharedService.formBuilderJson.components[i].rulesData.rules[j], currentComponent);
                                this.formBuilderSharedService.formBuilderJson.components[i].rulesData.rules[j].isRuleSatisfied = isRuleSatisfied;
                                break;
                            }

                            case DynamicComponentsEnum.RadioBoxComponent: {

                                //call function for match radiobox value
                                let isRuleSatisfied: boolean = this.matchRuleForRadioBox(this.formBuilderSharedService.formBuilderJson.components[i].rulesData.rules[j], currentComponent);
                                this.formBuilderSharedService.formBuilderJson.components[i].rulesData.rules[j].isRuleSatisfied = isRuleSatisfied;
                                break;
                            }

                            case DynamicComponentsEnum.DropBoxComponent: {

                                //call function for match dropbox value
                                let isRuleSatisfied: boolean = this.matchRuleForDropBox(this.formBuilderSharedService.formBuilderJson.components[i].rulesData.rules[j], currentComponent);
                                this.formBuilderSharedService.formBuilderJson.components[i].rulesData.rules[j].isRuleSatisfied = isRuleSatisfied;
                                break;
                            }
                        }
                    }
                }

                //Check condition here for ANY match type and Is All Rules Satisfied
                //let isRuleSatisfied: boolean = this.formBuilderSharedService.formBuilderJson.components[i].rulesData.rules[j].isRuleSatisfied;
                if (matchType == MatchType[MatchType.ANY] && !isAllRulesSatisfied) {
                    isAllRulesSatisfied = this.formBuilderSharedService.formBuilderJson.components[i].rulesData.rules[j].isRuleSatisfied;
                }

                //Check condition here for ALL match type and Is All Rules Satisfied
                if (matchType == MatchType[MatchType.ALL] && isAllRulesSatisfied) {
                    isAllRulesSatisfied = this.formBuilderSharedService.formBuilderJson.components[i].rulesData.rules[j].isRuleSatisfied;
                }
            }

            this.formBuilderSharedService.formBuilderJson.components[i].rulesData.isAllRulesSatisfied = isAllRulesSatisfied;
        }
        console.log(JSON.stringify(this.formBuilderSharedService.formBuilderJson));
    }

    /**
     * Check rule value and current component value on condition bases for InputBox
     * @param {any} ruleToCheck      [description]
     * @param {any} currentComponent [description]
     */
    matchRuleForInputBox(ruleToCheck: any, currentComponent: any): boolean {

        let currentComponentValue: string = currentComponent.componentData.componentGroups[0].inputBox.model;
        let ruleValue: string = ruleToCheck.value;

        let ruleCondition: string = ruleToCheck.condition;
        let conditionsEnum: ConditionsEnum = ConditionsEnum[ruleCondition];
        //Switch case to compare rule condition with condition enum 
        switch (conditionsEnum) {

            //Compare value for contains condition
            case ConditionsEnum.CONTAINS: {
                if (currentComponentValue.indexOf(ruleValue) !== -1) {
                    return true;
                }
                return false;
            }

            //Compare value for equals condition
            case ConditionsEnum.EQUAL: {
                if (currentComponentValue == ruleValue) {
                    return true;
                }
                return false;
            }

            //Compare value for not equals condition
            case ConditionsEnum.NOT_EQUAL: {
                if (currentComponentValue != ruleValue) {
                    return true;
                }
                return false;
            }
        }
    }

    /**
     * Check rule value and current component value on condition bases for CheckBox
     * @param {any} ruleToCheck      [description]
     * @param {any} currentComponent [description]
     */
    matchRuleForCheckBox(ruleToCheck: any, currentComponent: any): boolean {

        for (let i = 0; i < currentComponent.componentData.componentGroups.length; i++) {
            if (ruleToCheck.value == currentComponent.componentData.componentGroups[i].componentGroupId) {

                let ruleCondition: string = ruleToCheck.condition;
                let conditionsEnum: ConditionsEnum = ConditionsEnum[ruleCondition];

                let currentComponentValue: boolean = currentComponent.componentData.componentGroups[i].checkbox.model;

                //Switch case to compare rule condition with condition enum 
                switch (conditionsEnum) {

                    //Compare value for equals condition
                    case ConditionsEnum.EQUAL: {
                        if (currentComponentValue) {
                            return true;
                        }
                        return false;
                    }

                    //Compare value for not equals condition
                    case ConditionsEnum.NOT_EQUAL: {
                        if (!currentComponentValue) {
                            return true;
                        }
                        return false;
                    }
                }

            }
        }
        return false;
    }

    /**
     * Check rule value and current component value on condition bases for RadioBox
     * @param {any} ruleToCheck      [description]
     * @param {any} currentComponent [description]
     */
    matchRuleForRadioBox(ruleToCheck: any, currentComponent: any): boolean {

        let ruleCondition: string = ruleToCheck.condition;
        let conditionsEnum: ConditionsEnum = ConditionsEnum[ruleCondition];

        let currentComponentValue: string = currentComponent.componentData.selectedOption;
        let ruleValue: string = ruleToCheck.value;

        //Switch case to compare rule condition with condition enum 
        switch (conditionsEnum) {

            //Compare value for equals condition
            case ConditionsEnum.EQUAL: {
                if (currentComponentValue == ruleValue) {
                    return true;
                }
                return false;
            }

            //Compare value for not equals condition
            case ConditionsEnum.NOT_EQUAL: {
                if (currentComponentValue != ruleValue) {
                    return true;
                }
                return false;
            }
        }
        return false;
    }

    /**
     * Check rule value and current component value on condition bases for DropBox
     * @param {any} ruleToCheck      [description]
     * @param {any} currentComponent [description]
     */
    matchRuleForDropBox(ruleToCheck: any, currentComponent: any): boolean {

        let ruleCondition: string = ruleToCheck.condition;
        let conditionsEnum: ConditionsEnum = ConditionsEnum[ruleCondition];

        let currentComponentValue: string = currentComponent.componentData.selectedOption;
        let ruleValue: string = ruleToCheck.value;

        //Switch case to compare rule condition with condition enum 
        switch (conditionsEnum) {

            //Compare value for equals condition
            case ConditionsEnum.EQUAL: {
                if (currentComponentValue == ruleValue) {
                    return true;
                }
                return false;
            }

            //Compare value for not equals condition
            case ConditionsEnum.NOT_EQUAL: {
                if (currentComponentValue != ruleValue) {
                    return true;
                }
                return false;
            }
        }
        return false;
    }

    /**
     * Process By rule of component iteration 
     */
    processByRuleComponentIteration(callCount: number) {

        for (var i = 0; i < this.formBuilderSharedService.formBuilderJson.components.length; ++i) {

            this.proceedByRule(this.formBuilderSharedService.formBuilderJson.components[i], callCount);
        }
    }

    /**
     * proceed component by rule from default state to final state
     * @param {any} currentComponent [description]
     */
    proceedByRule(currentComponent: any, callCount: number) {

        //check for undefined and is rule is enabled 
        if (currentComponent != undefined &&
            currentComponent.isRuleEnable) {

            //Check is all rules are satisfied
            if (currentComponent.rulesData != undefined &&
                currentComponent.rulesData.isAllRulesSatisfied) {

                let componentFinalState: string = currentComponent.rulesData.finalState;
                let finalStateEnum: ComponentState = ComponentState[componentFinalState];

                this.changeComponentState(currentComponent.componentId, finalStateEnum, 5);
            } else {

                let componentDefaultState: string = currentComponent.rulesData.defaultState;
                let defaultStateEnum: ComponentState = ComponentState[componentDefaultState];

                this.changeComponentState(currentComponent.componentId, defaultStateEnum, 5);
            }
        }

        return true;
    }

    /**
     * Change component state based on final and default state Show/Hide 
     * @param {any}            componentId    [description]
     * @param {ComponentState} finalStateEnum [description]
     */
    changeComponentState(componentId: any, finalStateEnum: ComponentState, callCount: number) {

        //When maximum call reach then terminate
        if (callCount < 1)
            return;

        let componentDivId = "component_" + componentId;
        //Check is element present on page
        if ($('#' + componentDivId).length < 1) {

            callCount = callCount - 1;
            setTimeout(() => {
                this.changeComponentState(componentId, finalStateEnum, callCount);
            }, 200);
        }

        //Switch case to compare rule condition with condition enum 
        switch (finalStateEnum) {

            //Compare value for Hide state
            case ComponentState.HIDE: {

                $('#' + componentDivId).slideUp();
                break;
            }

            //Compare value for Show state
            case ComponentState.SHOW: {

                $('#' + componentDivId).slideDown();
                break;
            }
        }
    }
}