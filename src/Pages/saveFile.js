import {saveAs} from 'file-saver'
export const saveFileToPC=(fileName,content)=>{
    const bolb = new Blob([content],{type:'text/plain;charset=utf-8'})
    saveAs(bolb,`${fileName}.txt`)
}