import { Component, OnInit, Input } from '@angular/core';

/**
 * Enums
 */
import { Mode } from '../../../enums/mode.enum';
import { DynamicComponentsEnum } from '../../../enums/dynamicComponents.enum';

/**
 * Services
 */
import { FormBuilderSharedService } from '../../../sharedServices/formBuilderSharedService.service';

/**
 * Constants
 */
import { ComponentStateConstant, ComponentStateModel } from '../../../constants/componentState';
import { MatchTypeConstant, MatchTypeModel } from '../../../constants/matchType';

declare var $: any;

@Component({
    selector: 'app-rules',
    templateUrl: './rules.component.html',
    styleUrls: ['./rules.component.css'],
    providers: [ComponentStateConstant, MatchTypeConstant]
})
export class RulesComponent implements OnInit {

    @Input() data: any;
    private defaultStates: ComponentStateModel[] = [];
    private finalStates: ComponentStateModel[] = [];
    private matchTypes: MatchTypeModel[] = [];

    /**
     * Constructor
     * @param {FormBuilderSharedService} public formBuilderSharedService [description]
     */
    constructor(
        public formBuilderSharedService: FormBuilderSharedService,
        public componentStateConstant: ComponentStateConstant,
        public matchTypeConstant: MatchTypeConstant) {


    }

    /**
     * Ng onInit method
     */
    ngOnInit() {
        this.getDefaultStatesData();
        this.getFinalStatesData();
        this.getMatchTypesData();
        this.setDefaultValueToDefaultAndFinalState(this.componentStateConstant.DEFAULT_COMPONENT_STATE_MODEL.componentState);
        this.setMatchTypeDefaultState(this.matchTypeConstant.DEFAULT_MATCH_TYPE_MODEL.matchType);
    }

    /**
     * Get Default States options data from Enums
     */
    getDefaultStatesData() {
        let defaultState = this.componentStateConstant.getAllComponentStates();
        for (var i = 0; i < defaultState.length; i++) {
            this.defaultStates.push(this.componentStateConstant.getComponentStateModelByComponentState(defaultState[i].name));
        }
    }

    /**
     * Get Final States options data from Enums
     */
    getFinalStatesData() {
        let finalState = this.componentStateConstant.getAllComponentStates();
        for (var i = 0; i < finalState.length; i++) {
            this.finalStates.push(this.componentStateConstant.getComponentStateModelByComponentState(finalState[i].name));
        }
    }

    /**
     * Get Match Types options data from Enums
     */
    getMatchTypesData() {
        let matchType = this.matchTypeConstant.getAllMatchTypes();
        for (var i = 0; i < matchType.length; i++) {
            this.matchTypes.push(this.matchTypeConstant.getMatchTypeModelByMatchType(matchType[i].name));
        }
    }

    /**
     * Set default value to Default State and Final State
     * @param {any} defaultStateValue [description]
     */
    setDefaultValueToDefaultAndFinalState(defaultStateValue: any) {
        if (
            this.checkRulesDataIsNotUndefined() &&
            this.data.component.rulesData.defaultState != undefined &&
            this.data.component.rulesData.finalState != undefined &&
            this.data.component.rulesData.defaultState == '' &&
            this.data.component.rulesData.finalState == ''
        ) {
            this.data.component.rulesData.defaultState = defaultStateValue;
            this.data.component.rulesData.finalState = defaultStateValue;
        }
    }

    /**
     * Set default value to Default Match Type
     * @param {any} defaultMatchType [description]
     */
    setMatchTypeDefaultState(defaultMatchType: any) {
        if (
            this.checkRulesDataIsNotUndefined() &&
            this.data.component.rulesData.matchType != undefined &&
            this.data.component.rulesData.matchType == ''
        ) {
            this.data.component.rulesData.matchType = defaultMatchType;
        }
    }

    /**
     * Add new rule on plus icon click
     * @param {any} ruleComponent [description]
     */
    addNewRule(ruleComponent: any) {
        this.formBuilderSharedService.addNewRule(ruleComponent);
    }

    /**
     * Remove rule on minus icon click
     * @param {any} ruleComponent [description]
     * @param {any} ruleIndex     [description]
     */
    removeRule(ruleComponent: any, ruleIndex: any) {
        this.formBuilderSharedService.removeRule(ruleComponent, ruleIndex);
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
}
