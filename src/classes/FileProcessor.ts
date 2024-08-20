import path from "node:path";
import fs from "fs-extra";
import {LanguageMode} from "../types/index.js";
import Replacements from "../concerns/ReplacementInterface.js";

class FileProcessor {
    languageMode: LanguageMode;
    replacements: Replacements;
    hasPagination: boolean;
    hasSearch: boolean;

    constructor(languageMode: LanguageMode, replacements: Replacements, hasPagination: boolean, hasSearch: boolean) {
        this.languageMode = languageMode;
        this.replacements = replacements;
        this.hasPagination = hasPagination;
        this.hasSearch = hasSearch;
    }

    async processFilesInDirectory(inputDirectoryPath: string, outputDirectoryPath: string): Promise<void> {
        if (!await fs.pathExists(inputDirectoryPath)) {
            console.error(`Input directory does not exist: ${inputDirectoryPath}`);
            return;
        }

        const innerFiles = await fs.readdir(inputDirectoryPath);
        const allowedFiles = this.filterFiles(innerFiles, path.basename(inputDirectoryPath));

        for (let innerFile of allowedFiles) {
            await this.processFile(innerFile, inputDirectoryPath, outputDirectoryPath);
        }
    }

    filterFiles(innerFiles: string[], directory: string): string[] {
        let allowedFiles: string[] = [];

        if (directory === 'redux') {
            allowedFiles.push(
                !this.hasPagination
                    ? innerFiles.find(file => file.includes('NON_PAGINATED'))!
                    : innerFiles.find(file => file.includes('HAS_PAGINATION'))!
            );
        } else if (directory === 'interfaces') {
            allowedFiles = innerFiles.filter(file => this.hasPagination ? !file.includes('NON_PAGINATED') : !file.includes('HAS_PAGINATION'));
        } else if (directory === 'containers') {
            allowedFiles = this.filterContainerFiles(innerFiles);
        } else if (directory == 'views') {
            allowedFiles = this.filterViewFiles(innerFiles);
        } else if (directory == 'hooks') {
            allowedFiles = this.filterHookFiles(innerFiles);
        } else {
            allowedFiles = innerFiles;
        }

        return allowedFiles;
    }

    private filterContainerFiles(innerFiles: string[]): string[] {
        let allowedFiles: string[] = [
            innerFiles.find(file => file.includes('Form'))!,
        ];

        this.filterPaginatedSearchableFile(allowedFiles, innerFiles);

        return allowedFiles;
    }

    private filterViewFiles(innerFiles: string[]): string[] {
        let allowedFiles: string[] = [
            innerFiles.find(file => file.includes('columns')) as string,
            innerFiles.find(file => file.includes('Form')) as string,
        ];

        this.filterPaginatedSearchableFile(allowedFiles, innerFiles);

        return allowedFiles;
    }

    private filterHookFiles(innerFiles: string[]): string[] {
        const allowedFiles: string[] = [];

        if(this.hasPagination) {
            allowedFiles.push(innerFiles.find(file => file.includes('HAS_PAGINATION')) as string);
        } else {
            allowedFiles.push(innerFiles.find(file => file.includes('NON_PAGINATED')) as string);
        }

        return allowedFiles
    }

    private filterPaginatedSearchableFile(allowedFiles: string[], innerFiles: string[]) {
        if (this.hasPagination && this.hasSearch) {
            allowedFiles.push(innerFiles.find(file => file.includes('HAS_PAGINATION}}{{HAS_SEARCH'))!);
        } else if (!this.hasPagination && this.hasSearch) {
            allowedFiles.push(innerFiles.find(file => file.includes('NON_PAGINATED}}{{HAS_SEARCH'))!);
        } else if (this.hasPagination && !this.hasSearch) {
            allowedFiles.push(innerFiles.find(file => file.includes('HAS_PAGINATION}}{{SEARCH_NO'))!);
        } else {
            allowedFiles.push(innerFiles.find(file => file.includes('NON_PAGINATED}}{{SEARCH_NO'))!);
        }
    }

    async processFile(innerFile: string, inputDirectoryPath: string, outputDirectoryPath: string): Promise<void> {
        const inputFilePath = path.join(inputDirectoryPath, innerFile);

        if (!await fs.pathExists(inputFilePath)) {
            console.error(`File does not exist: ${inputFilePath}`);
            return;
        }

        let fileContent = await fs.readFile(inputFilePath, 'utf-8');

        for (const [placeholder, value] of Object.entries(this.replacements)) {
            const regex = new RegExp(`{{${placeholder}}}`, 'g');
            fileContent = fileContent.replace(regex, value);
            innerFile = innerFile.replace(regex, value);
        }

        // Write file to the output directory
        await fs.ensureDir(outputDirectoryPath);
        const finalOutputPath = path.join(
            outputDirectoryPath,
            innerFile.replace(
                '.com.stub',
                this.languageMode === 'typescript' ? '.tsx' : '.jsx'
            ).replace(
                '.stub',
                this.languageMode === 'typescript' ? '.ts' : '.js'
            )
        );
        await fs.writeFile(finalOutputPath, fileContent);

        console.log(`File written successfully: ${finalOutputPath}`);
    }
}

export default FileProcessor;
