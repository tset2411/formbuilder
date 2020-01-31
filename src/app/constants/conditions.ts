import { EnumValues } from 'enum-values';
import { DynamicComponentsEnum } from '../enums/dynamicComponents.enum';

/**
 * All conditions
 */
export enum ConditionsEnum {

	EQUAL,
	NOT_EQUAL,
	CONTAINS,
	SELECTED,
	NOT_SELECTED,
	GREATER_THAN,
	LESS_THAN
	/*START_WITH,
	END_WITH,
	DOES_NOT_START_WITH,
	DOES_NOT_END_WITH,
	DOES_NOT_CONTAIN,
	BETWEEN,
	LESS_THAN,
	GREATER_THAN,  
	GREATER_THAN_EQUAL, 
	LESS_THAN_EQUAL*/
}

/**
 * Input box conditions enums
 */
export enum InputBoxConditionsEnum {

	EQUAL,
	NOT_EQUAL,
	CONTAINS
}

/**
 * Check box conditions enums
 */
export enum CheckBoxConditionsEnum {
	EQUAL,
	NOT_EQUAL
}

/**
 * Radio box conditions enums
 */
export enum RadioBoxConditionsEnum {
	EQUAL,
	NOT_EQUAL
}

/**
 * Drop box conditions enums
 */
export enum DropBoxConditionsEnum {
	EQUAL,
	NOT_EQUAL
}

/**
 * File upload box conditions enums
 */
export enum FileUploadBoxConditionsEnum {
	EQUAL,
	NOT_SELECTED
}

/**
 * Date box conditions enums
 */
export enum DateBoxConditionsEnum {
	EQUAL,
	NOT_EQUAL,
	GREATER_THAN,
	LESS_THAN
}

/**
 * Condition model
 */
export class ConditionModel {
	condition: string;
	label: string;
}

/**
 * Conditions constant
 */
export class ConditionsConstant {

	/**
	 * Default condition to use everywhere
	 */
	public readonly DEFAULT_CONDITION_MODEL: ConditionModel = this.getConditionModelByCondition(ConditionsEnum[ConditionsEnum.EQUAL]);

	/**
	 * @param condition : this is the string of ConditionsEnum
	 * return ConditionModel
	 */
	getConditionModelByCondition(condition: string): ConditionModel {

		let conditionModel: ConditionModel = CONDITION_MODELS.filter(conditonModelObject => conditonModelObject.condition === condition)[0];
		return conditionModel;
	}

	/**
     * Get All enums value as list
     */
	getAllConditions(): any[] {
		return EnumValues.getNamesAndValues(ConditionsEnum);
	}

	/**
	 * Get conditions enums by component name
	 * @param {string} componentName [description]
	 */
	getConditionsEnumByComponentName(componentName: string) {

		var dynamicComponentsEnum: DynamicComponentsEnum = DynamicComponentsEnum[componentName];

		switch (dynamicComponentsEnum) {

			case DynamicComponentsEnum.InputBoxComponent: {
				return EnumValues.getNamesAndValues(InputBoxConditionsEnum);
			}

			case DynamicComponentsEnum.CheckBoxComponent: {
				return EnumValues.getNamesAndValues(CheckBoxConditionsEnum);
			}

			case DynamicComponentsEnum.RadioBoxComponent: {
				return EnumValues.getNamesAndValues(RadioBoxConditionsEnum);
			}

			case DynamicComponentsEnum.DropBoxComponent: {
				return EnumValues.getNamesAndValues(DropBoxConditionsEnum);
			}

			case DynamicComponentsEnum.FileUploadBoxComponent: {
				return EnumValues.getNamesAndValues(FileUploadBoxConditionsEnum);
			}

			case DynamicComponentsEnum.DateBoxComponent: {
				return EnumValues.getNamesAndValues(DateBoxConditionsEnum);
			}
		}
	}
}

/**
 * All conditions with labels to iterate over frontend dynamicaly
 */
const CONDITION_MODELS: ConditionModel[] = [
	{
		condition: ConditionsEnum[ConditionsEnum.EQUAL],
		label: "Equals"
	},
	{
		condition: ConditionsEnum[ConditionsEnum.CONTAINS],
		label: "Contains"
	},
	{
		condition: ConditionsEnum[ConditionsEnum.NOT_EQUAL],
		label: "Not Equals"
	},
	{
		condition: ConditionsEnum[ConditionsEnum.SELECTED],
		label: "Selected"
	},
	{
		condition: ConditionsEnum[ConditionsEnum.NOT_SELECTED],
		label: "Not Selected"
	},
	{
		condition: ConditionsEnum[ConditionsEnum.GREATER_THAN],
		label: "Greater Than"
	},
	{
		condition: ConditionsEnum[ConditionsEnum.LESS_THAN],
		label: "Less Than"
	}
];