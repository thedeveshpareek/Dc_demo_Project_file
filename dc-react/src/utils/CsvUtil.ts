import * as XLSX from 'xlsx';
import {RowInfo, WorkSheet} from "xlsx";

const generateCsv = (filename: string, rows: object[], headers?: string[]): void => {
    if (!rows || !rows.length) {
        return;
    }
    const separator: string = ",";
    const csvContent =
        headers?.map((record: any) => {
            return record.data ? record.name : '';
        }).join(separator) +
        '\n' +
        rows.map((record: any) => {
            return headers?.map(function (k: any) {
                let cell = record[k.data] === null || record[k.data] === undefined ? '' : record[k.data];
                cell = cell instanceof Date ? cell.toLocaleString() : cell.toString().replace(/"/g, '""');
                if (cell.search(/([",\n])/g) >= 0) {
                    cell = `"${cell}"`;
                }
                return cell;
            }).join(separator);
        }).join('\n').replace(/(^\[)|(\]$)/mg, '');
    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
    // @ts-ignore
    if (window.navigator.msSaveBlob) { // In case of IE 10+
        // @ts-ignore
        window.navigator.msSaveBlob(blob, filename);
    } else {
        const link = document.createElement('a');
        if (link.download !== undefined) {
            // Browsers that support HTML5 download attribute
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}
const generateExcel = (filename: string, data: object[]): void => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    // worksheet.headerFooter.firstHeader = "Hello Exceljs";
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
    // @ts-ignore
    if (window.navigator.msSaveBlob) { // In case of IE 10+
        // @ts-ignore
        window.navigator.msSaveBlob(blob, filename);
    } else {
        const link = document.createElement('a');
        if (link.download !== undefined) {
            // Browsers that support HTML5 download attribute
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}
const FileUtil = {
    generateCsv,
    generateExcel
}
export default FileUtil;
