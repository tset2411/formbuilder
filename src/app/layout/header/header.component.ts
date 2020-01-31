import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';

/**
 * Enums
 */
import { Mode } from '../../enums/mode.enum';

/**
 * Constants
 */
import { InputBoxConstant, Constants, CheckBoxConstant, RadioBoxConstant, DropBoxConstant, FileUploadBoxConstant, DateBoxConstant } from '../../constants/constants';

/**
 * Services
 */
import { FormBuilderSharedService } from '../../sharedServices/formBuilderSharedService.service';

/**
 * Routes
 */
import * as ROUTS from '../../constants/routes';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    ROUTS: any;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public formBuilderSharedService: FormBuilderSharedService) { }

    ngOnInit() {
        this.ROUTS = ROUTS;
    }

    /**
     * Add input-box component
     */
    addInputBox() {
        this.formBuilderSharedService.addInputBox(new InputBoxConstant().INPUT_BOX_CONSTANT);
    }

    /**
     * Add check-box component 
     */
    addCheckBox() {
        this.formBuilderSharedService.addCheckBox(new CheckBoxConstant().CHECK_BOX_CONSTANT);
    }

    /**
     * Add radio-box component
     */
    addRadioBox() {
        this.formBuilderSharedService.addRadioBox(new RadioBoxConstant().RADIO_BOX_CONSTANT);
    }

    /**
     * Add drop-box component
     */
    addDropBox() {
        this.formBuilderSharedService.addDropBox(new DropBoxConstant().DROP_BOX_CONSTANT);
    }

    /**
     * Add file upload box component
     */
    addFileUploadBox() {
        this.formBuilderSharedService.addFileUploadBox(new FileUploadBoxConstant().FILE_UPLOAD_BOX_CONSTANT);
    }

    /**
     * Add input type date box component
     */
    addDateBox() {
        this.formBuilderSharedService.addDateBox(new DateBoxConstant().DATE_BOX_CONSTANT);
    }

    /**
     * Preview generated form
     */
    previewForm() {
        this.formBuilderSharedService.changeJsonMode(Mode.PREVIEW);
        this.formBuilderSharedService.toggleIsAllowToDefaultInitializeData(false);
    }

    /**
     * Change mode to edit from preview while going home
     */
    goToHome() {
        this.formBuilderSharedService.changeJsonMode(Mode.EDIT);
    }

}
