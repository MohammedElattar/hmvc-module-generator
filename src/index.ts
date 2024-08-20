import InputHandler from "./classes/InputHandler";
import DirectoryManager from "./classes/DirectoryManager";
import FileProcessor from "./classes/FileProcessor";

const run = async (): Promise<void> => {
    try {
        const inputHandler = new InputHandler();
        const { languageMode, replacements, hasPagination, hasSearch, moduleCamelCase } = await inputHandler.getInputs();

        const directoryManager = new DirectoryManager(languageMode, moduleCamelCase);
        const directories = await directoryManager.getDirectories();

        const fileProcessor = new FileProcessor(languageMode, replacements, hasPagination, hasSearch);

        for (const directory of directories) {
            const { input, output } = directoryManager.getDirectoryPaths(directory);
            await fileProcessor.processFilesInDirectory(input, output);
        }

        console.log('Module files generated successfully!');
    } catch (error) {
        console.error('Error:', error);
    }
};

run();
