import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

/**
 * Enums
 */
import { Mode } from '../../../enums/mode.enum';
import { DateFormatesEnum, DateFormateConstant, DateFormateModel } from '../../../enums/dateFormates.enum';

/**
 * Services
 */
import { FormBuilderSharedService } from '../../../sharedServices/formBuilderSharedService.service';
import { RulesService } from '../../../sharedServices/rules.service';

/**
 * Constants
 */
import { Constants } from '../../../constants/constants';

//To use jquery
declare var $: any;

//To use moment
declare var moment: any;

@Component({
    selector: 'app-date-box-preview',
    templateUrl: './date-box.preview.component.html',
    styleUrls: ['./date-box.preview.component.css'],
    providers: [DatePipe, DateFormateConstant]
})
export class DateBoxPreviewComponent implements OnInit {

    @Input() data: any;
    private MODE: any;

    private date: Date = new Date();
    private currentMonth = this.date.getMonth();
    private currentDate = this.date.getDate();
    private currentYear = this.date.getFullYear();
    private dateFromateConstant = new Constants().DATE_FORMATE;
    private defaultDateFormate: string;

    constructor(
        public formBuilderSharedService: FormBuilderSharedService,
        public rulesService: RulesService,
        public dateFormateConstant: DateFormateConstant,
        public datePipe: DatePipe) {
    }

    ngOnInit() {

        this.MODE = Mode;

        // Set default formate to selected formate
        if (this.data.component.componentData.componentGroups[0].label.selectedFormate.model == "" || this.data.component.componentData.componentGroups[0].label.selectedFormate.model == undefined)
            this.data.component.componentData.componentGroups[0].label.selectedFormate.model = this.dateFormateConstant.DEFAULT_DATE_FORMATE_MODEL;

        let dateFormateConstant: DateFormateConstant = new DateFormateConstant();
        let tempDateFormate: string = this.data.component.componentData.componentGroups[0].label.selectedFormate.model;
        let selectedFormateEnum: DateFormatesEnum = DateFormatesEnum[tempDateFormate];
        switch (selectedFormateEnum) {

            //Compare value for contains condition
            case DateFormatesEnum.DD_MM_YYYY: {

                this.defaultDateFormate = dateFormateConstant.getDateFormateModelByDateFormate(DateFormatesEnum[DateFormatesEnum.DD_MM_YYYY]).formateValue;
                break;
            }
            case DateFormatesEnum.MM_DD_YYYY: {

                this.defaultDateFormate = dateFormateConstant.getDateFormateModelByDateFormate(DateFormatesEnum[DateFormatesEnum.MM_DD_YYYY]).formateValue;
                break;
            }
        }

        if (this.data.component.componentData.componentGroups[0].label.minDate.model != "" &&
            this.data.component.componentData.componentGroups[0].label.maxDate.model != "") {

            $("#dateBoxId").datetimepicker({
                minDate: new Date(this.data.component.componentData.componentGroups[0].label.minDate.model),
                maxDate: new Date(this.data.component.componentData.componentGroups[0].label.maxDate.model),
                format: this.defaultDateFormate
            });
        } else {

            $("#dateBoxId").datetimepicker({
                format: this.defaultDateFormate
            });
        }

        $("#dateBoxId").on("dp.change", (event) => {
            this.data.component.componentData.componentGroups[0].dateBox.model = event.currentTarget.value;
        });
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
