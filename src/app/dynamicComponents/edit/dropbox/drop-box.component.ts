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
    selector: 'app-drop-box',
    templateUrl: './drop-box.component.html',
    styleUrls: ['./drop-box.component.css']
})
export class DropBoxComponent implements OnInit {

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
    addOptionToGroup(componentGroup: any) {
        this.formBuilderSharedService.addDropdownOptionToGroup(componentGroup);
    }

    /**
     * Remove checkbox from group
     * @param {any} componentGroup [description]
     * @param {any} loopIndex      [description]
     */
    removeOptionFromGroup(componentGroup: any, loopIndex: any) {
        this.checkSelectedOptionBeforeRemove(componentGroup, loopIndex);
        this.formBuilderSharedService.removeElementBoxFromGroup(componentGroup, loopIndex);
    }

    /**
     * Check removed option is selcted option or not
     * @param {[type]} componentGroup [description]
     * @param {[type]} loopIndex      [description]
     */
    checkSelectedOptionBeforeRemove(componentGroup, loopIndex) {

        if (loopIndex != undefined &&
            componentGroup != undefined &&
            componentGroup.componentData != undefined &&
            componentGroup.componentData.selectedOption != undefined &&
            componentGroup.componentData.componentGroups[loopIndex] != undefined &&
            componentGroup.componentData.componentGroups[loopIndex].componentGroupId != undefined) {

            if (componentGroup.componentData.selectedOption == componentGroup.componentData.componentGroups[loopIndex].componentGroupId)
                componentGroup.componentData.selectedOption = "";
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
