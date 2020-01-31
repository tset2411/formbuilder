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
import * as CONSTANT from '../../../constants/constants';

@Component({
    selector: 'app-fileupload-box-preview',
    templateUrl: './fileUpload-box.preview.component.html',
    styleUrls: ['./fileUpload-box.preview.component.css']
})
export class FileUploadBoxPreviewComponent implements OnInit {

    @Input() data: any;
    private MODE: any;

    private CONSTANT: any;
    constructor(
        public formBuilderSharedService: FormBuilderSharedService,
        public rulesService: RulesService) {
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
