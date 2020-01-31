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
    selector: 'app-check-box',
    templateUrl: './check-box.component.html',
    styleUrls: ['./check-box.component.css']
})
export class CheckBoxComponent implements OnInit {

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
     * Add another check-box to Checkbox group
     * @param {[type]} componentGroup [description]
     */
    addCheckboxToGroup(componentGroup: any) {
        this.formBuilderSharedService.addCheckboxToGroup(componentGroup);
    }

    /**
     * Remove checkbox from group
     * @param {any} componentGroup [description]
     * @param {any} loopIndex      [description]
     */
    removeCheckboxFromGroup(componentGroup: any, loopIndex: any) {
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
