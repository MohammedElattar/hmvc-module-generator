import {LanguageMode} from "../types/index.js";

export default interface UserInputs {
    moduleSingularName: string;
    languageMode: LanguageMode;
    hasPagination: boolean;
    baseRouteName: string;
    reducerName: string;
    hasSearch: boolean;
    baseRouteId: string;
    moduleFriendlyName: string;
    moduleName: string;
    apiRouteName: string;
}