import {
    Directive,
    NgModule,
    Component,
    ComponentFactory,
    OnChanges,
    Input,
    ViewContainerRef,
    Compiler,
    ComponentFactoryResolver
} from '@angular/core';

import { CommonModule } from '@angular/common';

/**
 * Enums
 */
import { Mode } from '../enums/mode.enum';

/**
 * Components
 */
import { InputBoxComponent } from '../dynamicComponents/edit/inputBox/input-box.component';
import { CheckBoxComponent } from '../dynamicComponents/edit/checkBox/check-box.component';
import { RadioBoxComponent } from '../dynamicComponents/edit/radioBox/radio-box.component';
import { DropBoxComponent } from '../dynamicComponents/edit/dropbox/drop-box.component';
import { FileUploadBoxComponent } from '../dynamicComponents/edit/fileUploadBox/fileUpload-box.component';
import { DateBoxComponent } from '../dynamicComponents/edit/dateBox/date-box.component';
import { InputBoxPreviewComponent } from '../dynamicComponents/preview/inputBoxPreview/input-box.preview.component';
import { CheckBoxPreviewComponent } from '../dynamicComponents/preview/checkBoxPreview/check-box.preview.component';
import { RadioBoxPreviewComponent } from '../dynamicComponents/preview/radioBoxPreview/radio-box.preview.component';
import { DropBoxPreviewComponent } from '../dynamicComponents/preview/dropBoxPreview/drop-box.preview.component';
import { FileUploadBoxPreviewComponent } from '../dynamicComponents/preview/fileUploadBoxPreview/fileUpload-box.preview.component';
import { DateBoxPreviewComponent } from '../dynamicComponents/preview/dateBoxPreview/date-box.preview.component';

const ALL_DYNAMIC_COMPONENTS = {
    'InputBoxComponent': InputBoxComponent,
    'CheckBoxComponent': CheckBoxComponent,
    'RadioBoxComponent': RadioBoxComponent,
    'DropBoxComponent': DropBoxComponent,
    'FileUploadBoxComponent': FileUploadBoxComponent,
    'DateBoxComponent': DateBoxComponent
}

const ALL_DYNAMIC_PREVIEW_COMPONENT = {
    'InputBoxComponent': InputBoxPreviewComponent,
    'CheckBoxComponent': CheckBoxPreviewComponent,
    'RadioBoxComponent': RadioBoxPreviewComponent,
    'DropBoxComponent': DropBoxPreviewComponent,
    'FileUploadBoxComponent': FileUploadBoxPreviewComponent,
    'DateBoxComponent': DateBoxPreviewComponent
}


// https://stackoverflow.com/questions/39678963/load-existing-components-dynamically-angular-2-final-release
@Directive({
    selector: '[ctrl-factory]'
})
export class ControlFactoryDirective implements OnChanges {
    @Input() data: any;
    componentRef;
    init = false;

    constructor(
        private vcRef: ViewContainerRef,
        private resolver: ComponentFactoryResolver) { }

    /**
     * Create component
     */
    create(comp) {
        const factory = this.resolver.resolveComponentFactory(comp);
        const compRef = this.vcRef.createComponent(factory);

        (<any>compRef).instance.data = this.data;

        if (this.componentRef) {
            this.componentRef.destroy();
        }

        this.componentRef = compRef;
        this.init = true;
    }

    ngOnChanges() {
        if (!this.data || this.init) return;

        let comp = null;

        //  Check for edit or preview mode
        if (this.data.mode == Mode.EDIT) {
            comp = ALL_DYNAMIC_COMPONENTS[this.data.component.component];
        } else {
            comp = ALL_DYNAMIC_PREVIEW_COMPONENT[this.data.component.component];
        }

        if (comp) {
            this.create(comp);
        }
    }

    public ngOnDestroy() {
        if (this.componentRef) {
            this.componentRef.destroy();
            this.componentRef = null;
        }
    }
}