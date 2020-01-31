import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

/**
 * Enums
 */
import { Mode } from '../../../enums/mode.enum';
import { DateFormatesEnum, DateFormateConstant, DateFormateModel } from '../../../enums/dateFormates.enum';

/**
 * Constant
 */
import { Constants } from '../../../constants/constants';

/**
 * Services
 */
import { FormBuilderSharedService } from '../../../sharedServices/formBuilderSharedService.service';

//To use jquery
declare var $: any;


declare var moment: any;

@Component({
    selector: 'app-date-box',
    templateUrl: './date-box.component.html',
    styleUrls: ['./date-box.component.css'],
    providers: [DatePipe, DateFormateConstant]
})
export class DateBoxComponent implements OnInit {

    @Input() data: any;
    private MODE: any;
    private dateFormates: DateFormateModel[] = [];

    private date: Date = new Date();
    private currentMonth = this.date.getMonth();
    private currentDate = this.date.getDate();
    private currentYear = this.date.getFullYear();

    private defaultDateFormate: string;

    constructor(
        public formBuilderSharedService: FormBuilderSharedService,
        public datePipe: DatePipe,
        public dateFormateConstant: DateFormateConstant) {

    }

    /**
     * On ng on init
     */
    ngOnInit() {

        this.MODE = Mode;

        // Set default formate to selected formate
        if (this.data.component.componentData.componentGroups[0].label.selectedFormate.model == "")
            this.data.component.componentData.componentGroups[0].label.selectedFormate.model = this.dateFormateConstant.DEFAULT_DATE_FORMATE_MODEL.dateFormate;

        this.defaultDateFormate = this.dateFormateConstant.DEFAULT_DATE_FORMATE_MODEL.formateValue;
        this.dateFormates = this.dateFormateConstant.getDateFormatesModelConstants();

        this.setMinDate();
        this.setMaxDate();
    }

    setMinDate() {

        $("#minDate").datetimepicker({
            format: this.defaultDateFormate
        });

        //On select min date set to model
        $("#minDate").on("dp.change", (event) => {
            this.data.component.componentData.componentGroups[0].label.minDate.model = event.currentTarget.value;
        });
    }

    setMaxDate() {

        $("#maxDate").datetimepicker({
            format: this.defaultDateFormate
        });

        //On select max date set to model
        $("#maxDate").on("dp.change", (event) => {
            this.data.component.componentData.componentGroups[0].label.maxDate.model = event.currentTarget.value;
        });
    }

    /**
     * Remove main component by component id
     * @param {any} component [description]
     */
    removeComponentByComponentId(component: any) {
        this.formBuilderSharedService.removeComponentByComponentId(component);
    }

    /**
     * On input type dropdown change option method call and set as selected option
     * @param {Event} event [description]
     */
    onInputTypeChange(event: Event) {
        //    alert(this.data.component.componentData.componentGroups[0].label.inputTypeAttr.selectedInputType);
    }

    /**
     * On change date formate change
     * @param {any} selectedDateFormate [description]
     */
    onDateFormateChange(selectedDateFormate: string) {

        let dateFormateConstant: DateFormateConstant = new DateFormateConstant();
        let selectedFormateEnum: DateFormatesEnum = DateFormatesEnum[selectedDateFormate];
        switch (selectedFormateEnum) {

            //Compare value for contains condition
            case DateFormatesEnum.DD_MM_YYYY: {

                this.defaultDateFormate = dateFormateConstant.getDateFormateModelByDateFormate(DateFormatesEnum[DateFormatesEnum.DD_MM_YYYY]).formateValue;
                if (this.data.component.componentData.componentGroups[0].dateBox.model != "") {
                    var mydate = moment(this.data.component.componentData.componentGroups[0].dateBox.model, dateFormateConstant.getDateFormateModelByDateFormate(DateFormatesEnum[DateFormatesEnum.MM_DD_YYYY]).formateValue);
                    let finalDate = moment(mydate).format(dateFormateConstant.getDateFormateModelByDateFormate(DateFormatesEnum[DateFormatesEnum.DD_MM_YYYY]).formateValue);
                    this.data.component.componentData.componentGroups[0].dateBox.model = finalDate;
                }
                break;
            }
            case DateFormatesEnum.MM_DD_YYYY: {

                this.defaultDateFormate = dateFormateConstant.getDateFormateModelByDateFormate(DateFormatesEnum[DateFormatesEnum.MM_DD_YYYY]).formateValue;
                if (this.data.component.componentData.componentGroups[0].dateBox.model) {
                    var mydate = moment(this.data.component.componentData.componentGroups[0].dateBox.model, dateFormateConstant.getDateFormateModelByDateFormate(DateFormatesEnum[DateFormatesEnum.DD_MM_YYYY]).formateValue);
                    let finalDate = moment(mydate).format(dateFormateConstant.getDateFormateModelByDateFormate(DateFormatesEnum[DateFormatesEnum.MM_DD_YYYY]).formateValue);
                    this.data.component.componentData.componentGroups[0].dateBox.model = finalDate;
                }

                break;
            }
        }
    }

    /**
     * Enable Rule Check
     */
    enableRuleCheck() {

        this.data.component.isRuleEnable = !this.data.component.isRuleEnable
        if (this.data.component.isRuleEnable && this.data.component.rulesData.rules.length == 0) {
            this.formBuilderSharedService.addNewRule(this.data.component);
        }
    }
}
