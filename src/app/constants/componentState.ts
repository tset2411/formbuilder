import { EnumValues } from 'enum-values';

/**
 * Component State Enums
 */
export enum ComponentState {

    SHOW,
    HIDE
}

/**
 * Component State Model
 */
export class ComponentStateModel {

    componentState: string;
    label: string;
}

/**
 * Component State Constant
 */
export class ComponentStateConstant {

    /**
     * Default Component state set to show
     * @param {[type]} ComponentState[ComponentState.HIDE [description]
     */
    public readonly DEFAULT_COMPONENT_STATE_MODEL: ComponentStateModel = this.getComponentStateModelByComponentState(ComponentState[ComponentState.SHOW]);

    /**
     * Get component state model by component state 
     * @param  {string}              componentState [description]
     * @return {ComponentStateModel}                [description]
     */
    getComponentStateModelByComponentState(componentState: string): ComponentStateModel {
        let componentStateModel: ComponentStateModel = COMPONENT_STATE_MODELS.filter(componentStateModelObject => componentStateModelObject.componentState === componentState)[0];
        return componentStateModel;
    }

    /**
     * Get All enums value as list
     */
    getAllComponentStates(): any[] {
        return EnumValues.getNamesAndValues(ComponentState);
    }
}

/**
 * Component state Models constant
 * @type {ComponentStateModel[]}
 */
const COMPONENT_STATE_MODELS: ComponentStateModel[] = [
    {
        componentState: ComponentState[ComponentState.HIDE],
        label: "Hide",
    },
    {
        componentState: ComponentState[ComponentState.SHOW],
        label: "Show",
    }
];