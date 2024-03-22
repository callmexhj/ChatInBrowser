
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { CRX_CONTENT_OUTDIR } from './globalConfig'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: CRX_CONTENT_OUTDIR,
        lib: {
            entry: [
                path.resolve(__dirname, 'src/content/index.js'),
            ],
            formats: ['cjs'],
            fileName: () => {
                return 'content.js'
            }
        },
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    return 'content.css'
                },
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    define: {
        'process.env.NODE_ENV': null
    },
    plugins: [vue(), Components({
        resolvers: [
            AntDesignVueResolver({
                importStyle: false
            })
        ]
    })],
})