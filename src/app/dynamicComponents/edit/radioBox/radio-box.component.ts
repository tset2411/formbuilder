import { Component, OnInit, Input } from '@angular/core';

/**
 * Enums
 */
import { Mode } from '../../../enums/mode.enum';

/**
 * Services
 */
import { FormBuilderSharedService } from '../../../sharedServices/formBuilderSharedService.service';

@Component({
    selector: 'app-radio-box',
    templateUrl: './radio-box.component.html',
    styleUrls: ['./radio-box.component.css']
})
export class RadioBoxComponent implements OnInit {

    @Input() data: any;
    private MODE: any;

    constructor(public formBuilderSharedService: FormBuilderSharedService) {

    }

    ngOnInit() {
        this.MODE = Mode;
    }

    /**
     * Remove component by component id
     * @param {any} component [description]
     */
    removeComponentByComponentId(component: any) {
        this.formBuilderSharedService.removeComponentByComponentId(component);
    }

    /**
     * Add another radio-box to radiobox group
     * @param {[type]} componentGroup [description]
     */
    addRadioboxToGroup(componentGroup: any) {
        this.formBuilderSharedService.addRadioboxToGroup(componentGroup);
    }

    /**
     * Remove radiobox from group
     * @param {any} componentGroup [description]
     * @param {any} loopIndex      [description]
     */
    removeRadioboxFromGroup(componentGroup: any, loopIndex: any) {
        this.formBuilderSharedService.removeElementBoxFromGroup(componentGroup, loopIndex);
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
