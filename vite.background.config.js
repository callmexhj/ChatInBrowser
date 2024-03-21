import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { CRX_BACKGROUND_OUTDIR } from './globalConfig'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        // 输出目录
        outDir: CRX_BACKGROUND_OUTDIR,
        lib: {
            entry: [path.resolve(__dirname, 'src/background/index.js')],
            formats: ['cjs'],
            fileName:  () => {
                return 'background.js'
            }
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    plugins: [vue()],
})