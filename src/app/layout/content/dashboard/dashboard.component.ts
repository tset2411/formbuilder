import { Component, OnInit } from '@angular/core';

/**
 * Enums 
 */
import { Mode } from '../../../enums/mode.enum';

/**
 * Models
 */
import { DynamicComponent } from '../../../models/dynamicComponent.model';

/**
 * Services
 */
import { FormBuilderSharedService } from '../../../sharedServices/formBuilderSharedService.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    constructor(
        public formBuilderSharedService: FormBuilderSharedService) {
    }

    ngOnInit() {
        this.formBuilderSharedService.changeJsonMode(Mode.EDIT);
    }

    /**
     * Get dynamic component
     */
    getDynamicComponent(component: any, mode: string) {
        return new DynamicComponent(component, mode);
    }

}
