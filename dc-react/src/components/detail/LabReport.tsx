import React from 'react';

function LabReport(props:any) {
    const {report} = props;
    return (
        <object data={report.filePath} className={'w-100 height-600'}>
            Not supported
        </object>
    );
}

export default LabReport;
