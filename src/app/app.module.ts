import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

/**
 * Text Mask imports
 */
import { TextMaskModule } from 'angular2-text-mask';

/**
 * Components Imports
 */
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { DashboardComponent } from './layout/content/dashboard/dashboard.component';
import { PreviewComponent } from './layout/content/preview/preview.component';
import { InputBoxComponent } from './dynamicComponents/edit/inputBox/input-box.component';
import { CheckBoxComponent } from './dynamicComponents/edit/checkBox/check-box.component';
import { RadioBoxComponent } from './dynamicComponents/edit/radioBox/radio-box.component';
import { DropBoxComponent } from './dynamicComponents/edit/dropbox/drop-box.component';
import { FileUploadBoxComponent } from './dynamicComponents/edit/fileUploadBox/fileUpload-box.component';
import { DateBoxComponent } from './dynamicComponents/edit/dateBox/date-box.component';
import { RulesComponent } from './dynamicComponents/edit/rules/rules.component';
import { RuleComponent } from './dynamicComponents/edit/rules/rule/rule.component';
import { InputBoxPreviewComponent } from './dynamicComponents/preview/inputBoxPreview/input-box.preview.component';
import { CheckBoxPreviewComponent } from './dynamicComponents/preview/checkBoxPreview/check-box.preview.component';
import { RadioBoxPreviewComponent } from './dynamicComponents/preview/radioBoxPreview/radio-box.preview.component';
import { DropBoxPreviewComponent } from './dynamicComponents/preview/dropBoxPreview/drop-box.preview.component';
import { FileUploadBoxPreviewComponent } from './dynamicComponents/preview/fileUploadBoxPreview/fileUpload-box.preview.component';
import { DateBoxPreviewComponent } from './dynamicComponents/preview/dateBoxPreview/date-box.preview.component';

/**
 * Service Imports
 */
import { FormBuilderSharedService } from './sharedServices/formBuilderSharedService.service';
import { RulesService } from './sharedServices/rules.service';

//Make dynamic component directive
import { ControlFactoryDirective } from './utils/control-factory.directive'

/**
 * Import Routes
 */
import * as ROUTS from './constants/routes';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        DashboardComponent,
        PreviewComponent,
        InputBoxComponent,
        CheckBoxComponent,
        RadioBoxComponent,
        DropBoxComponent,
        FileUploadBoxComponent,
        DateBoxComponent,
        RulesComponent,
        RuleComponent,
        InputBoxPreviewComponent,
        CheckBoxPreviewComponent,
        RadioBoxPreviewComponent,
        DropBoxPreviewComponent,
        FileUploadBoxPreviewComponent,
        DateBoxPreviewComponent,
        ControlFactoryDirective
    ], entryComponents: [
        InputBoxComponent,
        CheckBoxComponent,
        RadioBoxComponent,
        DropBoxComponent,
        FileUploadBoxComponent,
        DateBoxComponent,
        InputBoxPreviewComponent,
        CheckBoxPreviewComponent,
        RadioBoxPreviewComponent,
        DropBoxPreviewComponent,
        FileUploadBoxPreviewComponent,
        DateBoxPreviewComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        TextMaskModule,
        RouterModule.forRoot(ROUTS.routes)
    ],
    providers: [
        FormBuilderSharedService,
        RulesService,
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
