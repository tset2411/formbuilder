import { EnumValues } from 'enum-values';

/**
 * Match type enums
 */
export enum MatchType {

    ALL,
    ANY
}

/**
 * Match type model class
 */
export class MatchTypeModel {

    matchType: string;
    label: string;
}

/**
 * Match type constant
 */
export class MatchTypeConstant {

    /**
     * Default match type set to ALL
     * @param {[type]} MatchType[MatchType.ALL [description]
     */
    public readonly DEFAULT_MATCH_TYPE_MODEL: MatchTypeModel = this.getMatchTypeModelByMatchType(MatchType[MatchType.ALL]);

    /**
     * Get match type model by match type
     * @param  {string}         matchType [description]
     * @return {MatchTypeModel}           [description]
     */
    getMatchTypeModelByMatchType(matchType: string): MatchTypeModel {
        let matchTypeModel: MatchTypeModel = MATCH_TYPE_MODELS.filter(matchModelObject => matchModelObject.matchType === matchType)[0];
        return matchTypeModel;
    }

    /**
     * Get All enums value as list
     */
    getAllMatchTypes(): any[] {
        return EnumValues.getNamesAndValues(MatchType);
    }
}


/**
 * Match Models
 * @type {MatchTypeModel[]}
 */
const MATCH_TYPE_MODELS: MatchTypeModel[] = [
    {
        matchType: MatchType[MatchType.ALL],
        label: "All",
    },
    {
        matchType: MatchType[MatchType.ANY],
        label: "Any",
    }
];