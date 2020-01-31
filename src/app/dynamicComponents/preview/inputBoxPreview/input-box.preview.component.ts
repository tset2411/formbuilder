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

/**
 * Constants
 */
import { InputTypeConstant, InputTypeModel } from '../../../constants/inputType';
import * as CONSTANT from '../../../constants/constants';

@Component({
    selector: 'app-input-box-preview',
    templateUrl: './input-box.preview.component.html',
    styleUrls: ['./input-box.preview.component.css'],
    providers: [InputTypeConstant]
})
export class InputBoxPreviewComponent implements OnInit {

    @Input() data: any;
    private MODE: any;

    private CONSTANT: any;
    constructor(
        public formBuilderSharedService: FormBuilderSharedService,
        public rulesService: RulesService,
        public inputTypeConstant: InputTypeConstant) {
    }

    ngOnInit() {
        this.MODE = Mode;
        this.CONSTANT = CONSTANT;
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
