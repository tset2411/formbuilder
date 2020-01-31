import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';

/**
 * Models
 */
import { DynamicComponent } from '../../../models/dynamicComponent.model';

/**
 * Services
 */
import { FormBuilderSharedService } from '../../../sharedServices/formBuilderSharedService.service';
import { RulesService } from '../../../sharedServices/rules.service';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public formBuilderSharedService: FormBuilderSharedService,
        public rulesService: RulesService) {
    }

    ngOnInit() {
        let isComponentData = this.isComponentDataExists();
        if (!isComponentData)
            this.router.navigateByUrl("/");

        this.rulesService.processByRuleComponentIteration(5);
    }

    /**
     * Get dynamic component
     */
    getDynamicComponent(component: any, mode: string) {
        return new DynamicComponent(component, mode);
    }

    /**
     * Check is component data exists or not
     * @return {boolean} [description]
     */
    isComponentDataExists(): boolean {
        if (this.formBuilderSharedService.formBuilderJson == undefined)
            return false;

        if (this.formBuilderSharedService.formBuilderJson.components.length > 0)
            return true;

        return false;
    }

}
