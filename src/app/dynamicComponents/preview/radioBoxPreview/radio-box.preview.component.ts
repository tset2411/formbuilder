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
    selector: 'app-radio-box-preview',
    templateUrl: './radio-box.preview.component.html',
    styleUrls: ['./radio-box.preview.component.css']
})
export class RadioBoxPreviewComponent implements OnInit {

    @Input() data: any;
    private MODE: any;

    constructor(
        public formBuilderSharedService: FormBuilderSharedService,
        public rulesService: RulesService
        ) {

    }

    ngOnInit() {
        this.MODE = Mode;
    }

    setSelectedRadioOption(selectedOptionGroupId: any) {
        this.data.component.componentData.selectedOption = selectedOptionGroupId;
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
