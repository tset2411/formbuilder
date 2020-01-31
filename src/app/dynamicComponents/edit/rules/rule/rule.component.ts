import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

/**
 * Enums
 */
import { Mode } from '../../../../enums/mode.enum';
import { DynamicComponentsEnum } from '../../../../enums/dynamicComponents.enum';

/**
 * Services
 */
import { FormBuilderSharedService } from '../../../../sharedServices/formBuilderSharedService.service';

/**
 * Constants
 */
import { ComponentStateConstant, ComponentStateModel } from '../../../../constants/componentState';
import { MatchTypeConstant, MatchTypeModel } from '../../../../constants/matchType';
import { ConditionsConstant, ConditionModel } from '../../../../constants/conditions';

declare var $: any;

@Component({
    selector: 'app-rule',
    templateUrl: './rule.component.html',
    styleUrls: ['./rule.component.css'],
    providers: [ComponentStateConstant, MatchTypeConstant, ConditionsConstant]
})
export class RuleComponent implements OnInit {

    @Input() rule: any;
    @Input() data: any;
    private conditions: ConditionModel[] = [];
    //    To Set limit to depedent component drop down options
    private currentComponentIndexInJson: number = 0;
    //    To get rule values options from current dependent value
    private selectedDependentComponentIndexInJson: number = 0;
    private inputBoxStr: string = "Inputbox";
    private checkBoxStr: string = "Checkbox";
    private radioBoxStr: string = "Radiobox";
    private dropBoxStr: string = "Dropbox";
    private fileUploadBoxStr: string = "FileUploadbox";
    private dateBoxStr: string = "Datebox";
    private selectedDependsOnComponentName: string;
    private DynamicComponentsEnum : any = DynamicComponentsEnum;

    /**
     * Constructor
     * @param {FormBuilderSharedService} public formBuilderSharedService [description]
     */
    constructor(
        public formBuilderSharedService: FormBuilderSharedService,
        public componentStateConstant: ComponentStateConstant,
        public matchTypeConstant: MatchTypeConstant,
        public conditionsConstant: ConditionsConstant) {

    }

    /**
     * Ng onInit method
     */
    ngOnInit() {
        this.initializeComponentBasedData();
    }

    /**
     * initialize component based data 
     */
    initializeComponentBasedData() {

        //this.setDefaultRuleValue();

        if(this.formBuilderSharedService.isAllowToDefaultInitializeData) {
            
            this.data.component.rulesData.rules[this.data.component.rulesData.rules.length - 1].dependantComponentId = this.formBuilderSharedService.formBuilderJson.components[0].componentId;    
            this.setDefaultCondition(this.conditionsConstant.DEFAULT_CONDITION_MODEL.condition);
        }

        let componentTemp = this.formBuilderSharedService.getComponentByComponentId(this.rule.dependantComponentId);
        if(componentTemp != undefined) {
            this.selectedDependsOnComponentName = componentTemp.component;
        } else {
            this.selectedDependsOnComponentName = this.formBuilderSharedService.formBuilderJson.components[0].component;
        }
        this.selectedDependentComponentIndexInJson = this.formBuilderSharedService.getIndexByComponentId(this.rule.dependantComponentId);
        this.currentComponentIndexInJson = this.formBuilderSharedService.getIndexByComponentId(this.data.component.componentId);
        this.getConditionsData(this.selectedDependsOnComponentName);
    }

    /**
     * Get all condtions options data from conditions Enums
     */
    getConditionsData(selectedComponentName: string) {
        this.conditions = [];
        let condition = this.conditionsConstant.getConditionsEnumByComponentName(selectedComponentName);
        for (var i = 0; i < condition.length; i++) {
            this.conditions.push(this.conditionsConstant.getConditionModelByCondition(condition[i].name));
        }
    }

    /**
     * Set Default Condition Value
     * @param {any} defaultCondition [description]
     */
    setDefaultCondition(defaultCondition: any) {
        if (
            this.checkRulesDataIsNotUndefined() &&
            this.data.component.rulesData.rules != undefined &&
            this.data.component.rulesData.rules[this.data.component.rulesData.rules.length - 1] != undefined &&
            this.data.component.rulesData.rules[this.data.component.rulesData.rules.length - 1].condition != undefined &&
            this.data.component.rulesData.rules[this.data.component.rulesData.rules.length - 1].condition == ''
        ) {
            this.data.component.rulesData.rules[this.data.component.rulesData.rules.length - 1].condition = defaultCondition;
        }
    }

    /**
     * Set rules default value
     */
    setDefaultRuleValue() {

        if (this.selectedDependsOnComponentName != undefined) {

            if (this.selectedDependsOnComponentName == 'InputBoxComponent') {
                this.rule.value = '';
            } else {
                this.rule.value = "-1";
            }
        }
    }

    /**
     * Check Rules data is not undefined before set default value
     */
    checkRulesDataIsNotUndefined() {
        if (this.data != undefined &&
            this.data.component != undefined &&
            this.data.component.rulesData != undefined
        )
            return true;
        else
            return false;
    }

    /**
     * Get Label name of component from Component name
     * @param  {string} componentName [description]
     * @return {string}               [description]
     */
    getComponentLabel(componentName: string): string {
        var dynamicComponentsEnum: DynamicComponentsEnum = DynamicComponentsEnum[componentName];

        switch (dynamicComponentsEnum) {

            case DynamicComponentsEnum.InputBoxComponent: {
                return this.inputBoxStr;
            }

            case DynamicComponentsEnum.CheckBoxComponent: {
                return this.checkBoxStr;
            }

            case DynamicComponentsEnum.RadioBoxComponent: {
                return this.radioBoxStr;
            }

            case DynamicComponentsEnum.DropBoxComponent: {
                return this.dropBoxStr;
            }

            case DynamicComponentsEnum.FileUploadBoxComponent: {
                return this.fileUploadBoxStr;
            }

            case DynamicComponentsEnum.DateBoxComponent: {
                return this.dateBoxStr;
            }
        }
    }

    /**
     * On dependent compoenent change set to selected dependent name
     * @param {any} event [description]
     */
    onDependanentComponentChange(event: any, dependantComponentId: string) {
        this.selectedDependsOnComponentName = $(event).find(":selected").attr('componentName');
        this.selectedDependentComponentIndexInJson = $(event).find(":selected").attr('data-index');
        this.setDefaultRuleValue();
        this.getConditionsData(this.selectedDependsOnComponentName);
    }
}
