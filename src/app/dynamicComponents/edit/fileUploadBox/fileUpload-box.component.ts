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

@Component({
    selector: 'app-fileupload-box',
    templateUrl: './fileUpload-box.component.html',
    styleUrls: ['./fileUpload-box.component.css'],
    providers: []
})
export class FileUploadBoxComponent implements OnInit {

    @Input() data: any;
    private MODE: any;

    constructor(
        public formBuilderSharedService: FormBuilderSharedService) {

    }

    /**
     * On ng on init
     */
    ngOnInit() {
        this.MODE = Mode;
    }

    /**
     * Remove main component by component id
     * @param {any} component [description]
     */
    removeComponentByComponentId(component: any) {
        this.formBuilderSharedService.removeComponentByComponentId(component);
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
