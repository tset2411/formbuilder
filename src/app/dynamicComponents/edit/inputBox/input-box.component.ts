import { Component, OnInit, Input } from '@angular/core';

/**
 * Enums
 */
import { Mode } from '../../../enums/mode.enum';

/**
 * Services
 */
import { FormBuilderSharedService } from '../../../sharedServices/formBuilderSharedService.service';

/**
 * Constants
 */
import { InputTypeConstant, InputTypeModel } from '../../../constants/inputType';

@Component({
    selector: 'app-input-box',
    templateUrl: './input-box.component.html',
    styleUrls: ['./input-box.component.css'],
    providers: [InputTypeConstant]
})
export class InputBoxComponent implements OnInit {

    @Input() data: any;
    private MODE: any;
    private inputTypeModels: InputTypeModel[] = [];

    constructor(
        public formBuilderSharedService: FormBuilderSharedService,
        public inputTypeConstant: InputTypeConstant) {

    }

    /**
     * On ng on init
     */
    ngOnInit() {
        this.MODE = Mode;
        let inputTypes = this.inputTypeConstant.getAllInputTypes();

        for (var i = 0; i < inputTypes.length; i++) {

            this.inputTypeModels.push(this.inputTypeConstant.getInputTypeModelByInputType(inputTypes[i].name));
        }

        this.setDefaultInputTypeValue(this.inputTypeConstant.DEFAULT_INPUT_TYPE_MODEL.inputType);
    }

    /**
     * Remove main component by component id
     * @param {any} component [description]
     */
    removeComponentByComponentId(component: any) {
        this.formBuilderSharedService.removeComponentByComponentId(component);
    }

    /**
     * On input type dropdown change option method call and set as selected option
     * @param {Event} event [description]
     */
    onInputTypeChange(event: Event) {
        //    alert(this.data.component.componentData.componentGroups[0].label.inputTypeAttr.selectedInputType);
    }

    /**
     * Set Default Value of input type
     * @param {any} defaultInputTypeValue [description]
     */
    setDefaultInputTypeValue(defaultInputTypeValue: any) {
        if (
            this.data != undefined &&
            this.data.component != undefined &&
            this.data.component.componentData != undefined &&
            this.data.component.componentData.componentGroups[0] != undefined &&
            this.data.component.componentData.componentGroups[0].label != undefined &&
            this.data.component.componentData.componentGroups[0].label.inputTypeAttr != undefined &&
            this.data.component.componentData.componentGroups[0].label.inputTypeAttr.selectedInputType != undefined &&
            this.data.component.componentData.componentGroups[0].label.inputTypeAttr.selectedInputType == ''
        ) {
            this.data.component.componentData.componentGroups[0].label.inputTypeAttr.selectedInputType = defaultInputTypeValue;
        }
    }

    /**
     * Enable Rule Check
     */
    enableRuleCheck() {

        this.data.component.isRuleEnable = !this.data.component.isRuleEnable
        if(this.data.component.isRuleEnable && this.data.component.rulesData.rules.length == 0) {
            this.formBuilderSharedService.addNewRule(this.data.component);    
        }
    }

}
