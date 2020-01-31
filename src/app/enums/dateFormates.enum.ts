import { EnumValues } from 'enum-values';

/**
 * All dateFormates
 */
export enum DateFormatesEnum {

    MM_DD_YYYY,
    DD_MM_YYYY
}

/**
 * Dateformate model
 */
export class DateFormateModel {

    dateFormate: string;
    label: string;
    formateValue: string;
}

/**
 * DateFormate Constants
 */
export class DateFormateConstant {

    /**
     * Default date formate to use everywhere
     */
    public readonly DEFAULT_DATE_FORMATE_MODEL: DateFormateModel = this.getDateFormateModelByDateFormate(DateFormatesEnum[DateFormatesEnum.MM_DD_YYYY]);

    /**
     * @param date formate : this is the string of DateFormateEnum
     * return DateFormateModel
     */
    getDateFormateModelByDateFormate(dateFormate: string): DateFormateModel {

        let dateFormateModel: DateFormateModel = DATEFORMATE_MODELS.filter(dateFormateModelObject => dateFormateModelObject.dateFormate === dateFormate)[0];
        return dateFormateModel;
    }

    getDateFormatesModelConstants() {
        return DATEFORMATE_MODELS;
    }

    /**
     * Get All enums value as list
     */
    getAllDateFormate(): any[] {
        return EnumValues.getNamesAndValues(DateFormatesEnum);
    }
}

/**
 * All date-formates with labels to iterate over frontend dynamicaly
 */
const DATEFORMATE_MODELS: DateFormateModel[] = [
    {
        dateFormate: DateFormatesEnum[DateFormatesEnum.DD_MM_YYYY],
        label: "DD/MM/YYYY",
        formateValue: "DD/MM/YYYY"
    },
    {
        dateFormate: DateFormatesEnum[DateFormatesEnum.MM_DD_YYYY],
        label: "MM/DD/YYYY",
        formateValue: "MM/DD/YYYY"
    }
];