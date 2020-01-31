/**
 * Enums
 */
import { Mode } from '../enums/mode.enum';

/**
 * Dynamic component
 */
export class DynamicComponent {

    component: any;

    mode: Mode;

    constructor(component: any, mode: string) {
        this.component = component;
        this.mode = Mode[mode];
    }
}