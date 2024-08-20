import {input} from "@inquirer/prompts";
import {
    convertCaseToSpaces,
    convertStringToPascalCase,
    pluralizeWord,
    singularizeWord,
    toCamelCase,
    toKebabCase, trimSlashes,
} from "../utils/string";
import {LanguageMode} from "../types/index.js";

export default class InputBuilder {
    private moduleName: string = "";
    private friendlyModuleName: string = "";
    private moduleSingularName: string = "";
    private modulePluralName: string = "";
    private reducerName: string = "";
    private baseRouteName: string = "";
    private baseRouteId: string = "";
    private apiRouteName: string = '';
    private languageMode: LanguageMode = "typescript";
    private hasSearch: boolean = true;
    private hasPagination: boolean = true;

    public static getInstance(): InputBuilder {
        return new InputBuilder();
    }

    public async getUserInputs(): Promise<{
        moduleName: string;
        reducerName: string;
        languageMode: LanguageMode;
        hasSearch: boolean;
        hasPagination: boolean;
        baseRouteName: string;
        baseRouteId: string;
        moduleSingularName: string;
        modulePluralName: string;
        moduleFriendlyName: string;
        apiRouteName: string;
    }> {
        try {
            this.moduleName = await this.readModuleName();
            this.friendlyModuleName = await this.readModuleFriendlyName();
            this.moduleSingularName = await this.readModuleSingularName();
            this.modulePluralName = trimSlashes(await this.readModulePluralName()).trim();
            this.languageMode = await this.readLanguageMode();
            this.hasPagination = await this.readIsPaginated();
            this.hasSearch = await this.readHasSearch();
            this.reducerName = await this.readReducerName();
            this.baseRouteName = await this.readBaseRouteName();
            this.baseRouteId = await this.readBaseRouteId();
            this.apiRouteName = await this.readApiRouteName();
        } catch (error) {
            console.error("Error getting user input:", error);
            throw error;
        }

        return {
            moduleName: this.moduleName,
            reducerName: this.reducerName,
            languageMode: this.languageMode,
            hasSearch: this.hasSearch,
            hasPagination: this.hasPagination,
            baseRouteName: this.baseRouteName,
            apiRouteName: this.apiRouteName,
            baseRouteId: this.baseRouteId,
            moduleSingularName: this.moduleSingularName,
            modulePluralName: this.modulePluralName,
            moduleFriendlyName: this.friendlyModuleName,
        };
    }

    private async readModuleName(): Promise<string> {
        return input({
            message: "What is the name of the module?",
            validate: (input: string) => (input ? true : "Module name cannot be empty."),
        });
    }

    private async readModuleFriendlyName(): Promise<string> {
        return input({
            message: "Please provide a friendly name for the module:",
            default: convertCaseToSpaces(convertStringToPascalCase(this.moduleName)),
            validate: (input: string) => (input ? true : "Friendly name cannot be empty."),
        });
    }

    private async readModuleSingularName(): Promise<string> {
        return input({
            message: "What is the singular name of the module?",
            validate: (input: string) => (input ? true : "Module singular name cannot be empty."),
            default: singularizeWord(this.moduleName),
        });
    }

    private async readModulePluralName(): Promise<string> {
        return input({
            message: "What is the plural name of the module?",
            validate: (input: string) => (trimSlashes(input.trim()) ? true : "Module plural name cannot be empty."),
            default: pluralizeWord(this.moduleSingularName),
        });
    }

    private async readLanguageMode(): Promise<LanguageMode> {
        return (await input({
            message: "Choose the language for the module (1 for JavaScript (soon), 2 for TypeScript):",
            default: "2",
            validate: (input: string) => ["2"].includes(input) ? true : "Please select a valid option.",
        })) === "2"
            ? "typescript"
            : "javascript";
    }

    private async readIsPaginated(): Promise<boolean> {
        return (await input({
            message: "Is table paginated? (yes/no)",
            default: "yes",
            validate: (input: string) => ["yes", "no"].includes(input) ? true : "Please select a valid option.",
        })) === "yes";
    }

    private async readHasSearch(): Promise<boolean> {
        return (await input({
            message: "Does table have search? (yes/no)",
            default: "yes",
            validate: (input: string) => ["yes", "no"].includes(input) ? true : "Please select a valid option.",
        })) === "yes";
    }

    private async readReducerName(): Promise<string> {
        return input({
            message: "What is the name of the reducer?",
            default: `${toCamelCase(this.moduleName)}Reducer`,
            validate: (input: string) => (input ? true : "Reducer name cannot be empty."),
        });
    }

    private async readBaseRouteName(): Promise<string> {
        return input({
            message: `What is the base route name? (e.g. /${this.moduleName})`,
            default: pluralizeWord(toKebabCase(this.moduleName)),
            validate: (input: string) => (input ? true : "You must enter the base route name."),
        });
    }

    private async readApiRouteName(): Promise<string> {
        return input({
            message: `What is api route name ? (e.g. /api/${this.moduleName})`,
            default: pluralizeWord(toKebabCase(this.moduleName)),
            validate: (input: string) => (input ? true : "You must enter the base route name."),
        });
    }

    private async readBaseRouteId(): Promise<string> {
        return input({
            message: "What is the base route id? (e.g. /vendors/:vendorId)",
            default: "id",
            validate: (input: string) => (input ? true : "You must enter the base route id."),
        });
    }
}
