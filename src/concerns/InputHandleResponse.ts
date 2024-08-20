import Replacements from "./ReplacementInterface.js";

export default interface InputHandlerResponse {
    languageMode: 'typescript' | 'javascript';
    hasPagination: boolean;
    hasSearch: boolean;
    replacements: Replacements;
    moduleCamelCase: string;
    apiRouteName: string;
}