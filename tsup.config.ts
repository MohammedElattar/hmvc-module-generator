import { defineConfig } from 'tsup';
import path from "node:path";
import fs from 'fs-extra';

export default defineConfig({
    format: ['cjs', 'esm'],
    entry: ['./src/index.ts'],
    dts: true,
    shims: true,
    skipNodeModulesBundle: true,
    clean: true,
    onSuccess: async () => {
        // Copy the 'stubs' directory to the output directory
        const srcDir = path.resolve(__dirname, 'src', 'stubs');
        const destDir = path.resolve(__dirname, 'dist', 'stubs');

        try {
            await fs.copy(srcDir, destDir);
            console.log('Stubs directory copied successfully!');
        } catch (err) {
            console.error('Error copying stubs directory:', err);
        }
    },
});