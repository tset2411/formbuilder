import { Component, OnInit, Input } from '@angular/core';

/**
 * Enums
 */
import { Mode } from '../../../enums/mode.enum';

/**
 * Services
 */
import { FormBuilderSharedService } from '../../../sharedServices/formBuilderSharedService.service';
import { RulesService } from '../../../sharedServices/rules.service';

@Component({
    selector: 'app-drop-box-preview',
    templateUrl: './drop-box.preview.component.html',
    styleUrls: ['./drop-box.preview.component.css']
})
export class DropBoxPreviewComponent implements OnInit {

    @Input() data: any;
    private MODE: any;

    constructor(
        public formBuilderSharedService: FormBuilderSharedService,
        public rulesService: RulesService) {

    }

    ngOnInit() {
        this.MODE = Mode;
        this.selectDefaultFirstValue();
    }

    /**
     * Select selected option default first option
     */
    selectDefaultFirstValue() {
        if (this.data != undefined &&
            this.data.component != undefined &&
            this.data.component.componentData != undefined &&
            this.data.component.componentData.selectedOption != undefined &&
            this.data.component.componentData.selectedOption == "" &&
            this.data.component.componentData.componentGroups[0].componentGroupId != undefined) {
            this.data.component.componentData.selectedOption = this.data.component.componentData.componentGroups[0].componentGroupId;
        }
    }

    /**
     * On Optin Select
     * @param {any} selectedOption [description]
     */
    onOptionSelect(selectedOption: any) { 
        this.data.component.componentData.selectedOption = selectedOption;
        this.processToVerifyRules(this.data.component);
    }

    /**
     * Process to check and varify applied rules from currentComponentId and value
     * @param {[type]} currentComponentId [description]
     * @param {[type]} currentValue       [description]
     */
    processToVerifyRules(currentComponent: any) {
        this.rulesService.processToVerifyRules(currentComponent);
        this.rulesService.processByRuleComponentIteration(5);
    }
}
