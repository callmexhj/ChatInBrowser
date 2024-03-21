import fs from 'fs'
import path from 'path'
import { CRX_OUTDIR, CRX_CONTENT_OUTDIR, CRX_BACKGROUND_OUTDIR } from './globalConfig.js'

const copyDirectory = (srcDir, destDir) => {
    if (!fs.existsSync(destDir)) fs.madeir(destDir)
    fs.readdirSync(srcDir).forEach((file) => {
        const srcPath = path.join(srcDir, file)
        const destPath = path.join(destDir, file)

        if (fs.lstatSync(srcPath).isDirectory()) {
            copyDirectory(srcPath, destPath)
        } else {
            fs.copyFileSync(srcPath, destPath)
        } 
    })
}

const deleteDirectory = (dir) => {
    if(fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach((file) => {
            const curPath = path.join(dir, file)
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteDirectory(curPath)
            } else {
                fs.unlinkSync(curPath)
            }
        })
        fs.rmdirSync(dir)
    }
}

// 源目录：content script临时生成目录
const contentOutDir = path.resolve(process.cwd(), CRX_CONTENT_OUTDIR)
// 源目录：background script临时生成目录
const backgroundOutDir = path.resolve(process.cwd(), CRX_BACKGROUND_OUTDIR)
// 目标目录：Chrome Extension 最终build目录
const outDir = path.resolve(process.cwd(), CRX_OUTDIR)
// 将复制源目录内的文件和目录全部复制到目标目录中
copyDirectory(contentOutDir, outDir)
copyDirectory(backgroundOutDir, outDir)
// 删除源目录
deleteDirectory(contentOutDir)
deleteDirectory(backgroundOutDir)