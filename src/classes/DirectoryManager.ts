import path from "node:path";
import fs from "fs-extra";
import {LanguageMode} from "../types/index.js";

class DirectoryManager {
    languageDirectory: string;
    outputDir: string;

    constructor(languageMode: LanguageMode, moduleCamelCase: string) {
        this.languageDirectory = path.resolve(__dirname, `stubs/${languageMode}`);
        console.log(__dirname)

        this.outputDir = path.resolve(__dirname, '../', '../', '../', 'src', 'modules', `${moduleCamelCase}`);
    }

    async getDirectories(): Promise<string[]> {
        return await fs.readdir(this.languageDirectory);
    }

    getDirectoryPaths(directory: string): { input: string; output: string } {
        return {
            input: path.join(this.languageDirectory, directory),
            output: path.join(this.outputDir, directory),
        };
    }
}

export default DirectoryManager;
