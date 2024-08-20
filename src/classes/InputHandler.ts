import InputBuilder from "./InputBuilder.js";
import UserInputs from "../concerns/UserInputs.js";
import {convertStringToPascalCase, pluralizeWord, toCamelCase} from "../utils/string.js";
import InputHandlerResponse from "../concerns/InputHandleResponse.js";

class InputHandler {
    async getInputs(): Promise<InputHandlerResponse> {
        const {
            moduleSingularName,
            moduleName,
            languageMode,
            hasPagination,
            baseRouteName,
            reducerName,
            hasSearch,
            baseRouteId,
            moduleFriendlyName,
            apiRouteName
        }: UserInputs = await InputBuilder.getInstance().getUserInputs();

        return {
            languageMode,
            hasPagination,
            moduleCamelCase: toCamelCase(moduleName),
            hasSearch,
            apiRouteName,
            replacements: {
                MODULE_PASCAL_CASE: convertStringToPascalCase(moduleSingularName),
                MODULE_CAMEL_CASE: toCamelCase(moduleSingularName),
                MODULE_SINGULAR_FRIENDLY_NAME: moduleFriendlyName,
                MODULE_PLURAL_FRIENDLY_NAME: pluralizeWord(moduleFriendlyName),
                MODULE_PLURALIZED_CASE: pluralizeWord(moduleSingularName),
                MODULE_LOCAL_ROUTE: baseRouteName,
                MODULE_LOCAL_ROUTE_ID: baseRouteId,
                MODULE_PLURALIZED_PASCAL_CASE: convertStringToPascalCase(pluralizeWord(moduleSingularName)),
                REDUX_REDUCER_NAME: reducerName,
                HAS_PAGINATION: "",
                HAS_SEARCH: "",
                NON_PAGINATED: "",
                SEARCH_NO: "",
                API_ROUTE_NAME: apiRouteName
            }
        };
    }
}

export default InputHandler;