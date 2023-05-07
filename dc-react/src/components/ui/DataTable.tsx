import React, {useEffect, useState} from 'react';
import http from "../../config/httpConfig";
import moment from "moment";
import FileUtil from "../../utils/CsvUtil";
import CsvUtil from "../../utils/CsvUtil";
import PdfUtil from "../../utils/PdfUtil";
import FuncUtil from "../../utils/FuncUtil";
import {useReactToPrint} from "react-to-print";


interface Page {
    pageNumber: number,
    pageSize: number,
    text: string,
    from: string,
    to: string
    total: number,
    data: []
}

function DataTable(props: any) {
    const {columns, endpoint, pagesSizes, actionButtons, dateFilter} = props;
    const [filteredData, setFilteredData] = useState([]);
    let [page, setPage] = useState({
        pageNumber: 0,
        pageSize: pagesSizes ? pagesSizes[pagesSizes.length-1] : 9999,
        column: "id",
        sort: "DESC",
        text: "",
        from: moment(new Date()).format('YYYY-MM-DD'),
        to: moment(new Date()).format('YYYY-MM-DD'),
        total: 0
    });
    const [pages, setPages] = useState([0]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFailed, setIsFailed] = useState(false);
    const [message, setMessage] = useState("");

    const generateCsvData = () => {
        return filteredData.map((record:any) => {
            delete record.createdDate;
            delete record.modifiedDate;
            return Object.keys(record).map(function (k) {
                return record[k]
            }).join('\t');
        }).join('\n');
    }

    const onCopy = () => {
        navigator.clipboard.writeText(generateCsvData());
    }

    const onCsv = () => {
        filteredData.map((record:any) => {
            delete record.createdDate;
            delete record.modifiedDate;
            return record;
        })
        FileUtil.generateCsv("data.csv", filteredData, columns);
    }
    const onExcel = () => {
        filteredData.map((record:any) => {
            delete record.createdDate;
            delete record.modifiedDate;
            return record;
        })
        CsvUtil.generateExcel('data',filteredData);
    }
    const onPdf = () => {
        PdfUtil.downloadPdf("data", "datatable-download");
    }

    const handlePrint = useReactToPrint({
        content: () => document.getElementById('datatable-print'),
    });

    const reload = () => {
        page.pageNumber = 0;
        loadData();
    }
    const typeHandler = (e: any) => {
        page.text = e.target.value;
        page.pageNumber = 0;
        loadData();
    }
    let loadData = () => {
        setIsLoading(true);
        http.post(endpoint, page).then(response => {
            setFilteredData(response.data.data);
            setPage(response.data);
            updatePagination(response.data);
            setIsLoading(false);
            setIsFailed(false);
        }).catch(reason => {
            setIsFailed(true);
            setMessage(reason.code);
            setIsLoading(false);
        });
    };

    const updatePagination = (pageDetail: Page) => {
        page.total = pageDetail.total;
        pageDetail.pageSize = pageDetail.pageSize < 1 ? 1 : pageDetail.pageSize;
        let pageNumbers = [];
        let totalPages = (page.total / page.pageSize);
        if (totalPages < 5) {
            for (let i = 0; i < totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            let start = (page.pageNumber - 2) > 0 ? page.pageNumber - 2 : 0;
            let end = (page.pageNumber + 3) < totalPages ? page.pageNumber + 3 : totalPages;
            for (let i = start; i < (end < 5 ? 5 : end); i++) {
                pageNumbers.push(i);
            }
        }
        setPages(pageNumbers);
    }

    const pageSizeHandler = (e: any) => {
        page.pageSize = e.target.value;
        loadData();
    }

    const changePage = (e: any) => {
        e.preventDefault();
        page.pageNumber = parseInt(e.target.dataset.page);
        loadData();
    }
    const prev = (e: any) => {
        e.preventDefault();
        if (page.pageNumber > 0) {
            page.pageNumber--;
            loadData();
        }
    }
    const next = (e: any) => {
        e.preventDefault();
        if (page.pageNumber < (page.total / page.pageSize - 3)) {
            page.pageNumber++;
            loadData();
        }
    }
    const onFromDateChange = (e: any) => {
        page.from = e.target.value;
        loadData();
    }
    const onToDateChange = (e: any) => {
        page.to = e.target.value;
        loadData();
    }
    useEffect(() => {
        if (isLoading) {
            loadData();
        }
    }, [isLoading,loadData])

    useEffect(() => {
        loadData();
    }, [props.refresh]);

    const calculateSum = (field: string) => {
        let number = 0;
        filteredData.map((record: any) => {
            number += record[field];
            return record;
        });
        return number;
    }

    const handleSort = (column: string) => {
        if (page.column === column){
            page.sort = page.sort === 'ASC'?'DESC':'ASC';
        }else{
            page.column = column;
            page.sort = 'ASC';
        }
        loadData();
    }

    const handleChange = (e: any) => {
        if (e.target.name == 'from'){
            page.from = e.target.value;
        }else if(e.target.name == 'to'){
            page.to = e.target.value;
        }else{
            switch (e.target.value){
                case 'today':
                    page.from = moment(new Date()).format('YYYY-MM-DD');
                    page.to = moment(new Date()).format('YYYY-MM-DD');
                    break;
                case 'yesterday':
                    page.from = moment(new Date()).subtract(1, "days").format('YYYY-MM-DD');
                    page.to = moment(new Date()).subtract(1, "days").format('YYYY-MM-DD');
                    break;
                case 'week':
                    page.from = moment(new Date()).subtract(7, "days").format('YYYY-MM-DD');
                    page.to = moment(new Date()).format('YYYY-MM-DD');
                    break;
                case 'month':
                    page.from = moment(new Date()).subtract(30, "days").format('YYYY-MM-DD');
                    page.to = moment(new Date()).format('YYYY-MM-DD');
                    break;
                case 'year':
                    page.from = moment(new Date()).subtract(365, "days").format('YYYY-MM-DD');
                    page.to = moment(new Date()).format('YYYY-MM-DD');
                    break;
            }
        }
        loadData();
    }

    return (
        <div className={"row"}>
            {actionButtons ?
                <div className={"col-md-12 mb-1"}>
                    <div className={"buttons-group"}>
                        <button type="button" className="btn btn-sm btn-outline-blue btn-min-width mr-1 box-shadow-1"
                                onClick={onCopy}>Copy
                        </button>
                        <button type="button" className="btn btn-sm btn-outline-yellow btn-min-width mr-1 box-shadow-1"
                                onClick={onCsv}>CSV
                        </button>
                        <button type="button" className="btn btn-sm btn-outline-blue-grey btn-min-width mr-1 box-shadow-1"
                                onClick={onExcel}>Excel
                        </button>
                        <button type="button" className="btn btn-sm btn-outline-pink btn-min-width mr-1 box-shadow-1"
                                onClick={onPdf}>PDF
                        </button>
                        <button type="button" className="btn btn-sm btn-outline-purple btn-min-width mr-1 box-shadow-1"
                                onClick={handlePrint}>Print
                        </button>
                    </div>
                </div> : ""
            }
            <div className={`col-md-12 mb-1`}>
                <div className={'input-group pull-right col-7'}>
                    <input type="text" className="form-control round box-shadow-1"
                           placeholder={props.searchPlaceholder ? props.searchPlaceholder : 'Type Here to Search'}
                           aria-label="Amount (to the nearest dollar)" name="amount" onChange={typeHandler}/>
                    <button className="btn btn-info  box-shadow-1" onClick={reload}><i className="ft-refresh-cw"></i>
                    </button>
                </div>
                {dateFilter ?
                    <div className={'input-group pull-right col-5'}>
                        <input type="date" className="form-control round mr-1 box-shadow-1" value={page.from}
                               name="from"
                               onChange={onFromDateChange}/>
                        <span className={"mr-1 mt-1"}>TO</span>
                        <input type="date" className="form-control round mr-1 box-shadow-1" value={page.to} name="to"
                               onChange={onToDateChange}/>
                        <select className="form-control" name={'duration'} onChange={handleChange}>
                            <option value="today">Today</option>
                            <option value="yesterday">Yesterday</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="year">This Year</option>
                        </select>
                    </div>
                    : ""
                }
            </div>
            <div className={"col-md-12"}>
                <div className="table-container">
                    <table className="table table-sm table-striped table-bordered sourced-data" id={"datatable"}>
                        <thead className="bg-primary white">
                        <tr>
                            {columns.map((column: any,index:number) => (
                                <th key={index}  className={column.class?column.class.replace('text-right','text-center').replace('text-left','text-center'):''}>
                                    {column.name} {column.sort ?<i className="ft-shuffle pull-right" onClick={()=>handleSort(column.data)}></i>:''}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {filteredData.map((record: any, index) => (
                            <tr key={index}>
                                {columns.map((column: any, cellNumber: number) => (
                                    column["render"] ? <td className={column.class}>{column.render(record)}</td> :
                                        <td key={'rec-' + record.id + '-' + cellNumber} className={column.class}>
                                            {
                                                column.data === 'index' ? index + 1 : (column.currency ? FuncUtil.toCurrency(record[column.data],"BDT"):record[column.data])
                                            }
                                        </td>
                                ))}
                            </tr>
                        ))}

                        </tbody>

                        <tfoot>
                        {isLoading ? <tr key={'foot-tr-loading'}>
                            <td colSpan={columns.length} className={"text-center"}>Loading...</td>
                        </tr> : ""}
                        {!isLoading ?
                            <tr key={'foot-tr-1'} >
                                {columns.map((column: any,index:number) => (
                                    column["calculateSum"] ?
                                        <td key={index} className={column.class}>
                                            <strong>
                                            {
                                                column.currency ? FuncUtil.toCurrency(calculateSum(column.data),"BDT") : calculateSum(column.data)
                                            }
                                            </strong>
                                        </td> :
                                        <td key={'foot-'+index} className={column.class}></td>
                                ))}
                            </tr> : ""
                        }
                        </tfoot>
                    </table>
                </div>
                <div className={'w-100 datatable-download'} id={'datatable-download'}>
                    <table className={'table-bordered m-1'} id={'datatable-print'}>
                        <thead>
                        <tr>
                            <td style={{border:'0px'}} colSpan={columns.filter((column:any)=>{return column.name !== 'Action'}).length}> Data From {page.from} TO {page.to}</td>
                        </tr>
                        <tr>
                            {columns.map((column: any,index:number) => (
                                column.name !== 'Action' ?
                                    <th key={'th'+index} className={column.class?column.class.replace('text-right','text-center').replace('text-left','text-center'):''}>{column.name}</th>
                                    :''
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {filteredData.map((record: any, index) => (
                            <tr key={'rec-' + index}>
                                {columns.map((column: any, cellNumber: number) => (
                                    column.name !== 'Action' ? (
                                        column["render"] ?
                                            <td key={cellNumber} className={column.class}>{column.render(record)}</td>
                                            :<td key={cellNumber} className={column.class}>
                                            {column.data === 'index' ? index + 1 : (column.currency ? FuncUtil.toCurrency(record[column.data],"BDT"):record[column.data])}
                                        </td>):''
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={"col-12"}>
                {isFailed ? (
                    <div className="alert alert-danger mb-1 alert-icon-left" role="alert">
                        <span className="alert-icon"> <i className="ft-alert-circle"></i> </span>
                        {message}
                    </div>) : ''}
            </div>
            <div className={"col-12"}>
                <div className={"row"}>
                    <div className={"col-8 mt-1"}>
                        <select className="form-control pull-left width-20-per" onChange={pageSizeHandler}>
                            {pagesSizes ? pagesSizes.map((column: any, index:number) => (
                                <option key={'size'+index} value={column}>{column} Record</option>
                            )) : (<>
                                    <option value={10}>10 Record</option>
                                    <option value={20}>20 Record</option>
                                    <option value={30}>30 Record</option>
                                    <option value={50}>50 Record</option>
                                    <option value={100}>100 Record</option>
                                    <option value={9999} selected={true}>All Record</option>
                                </>
                            )}

                        </select>
                        <div className="dataTables_info pull-left ml-2 mt-1" id="DataTables_Table_1_info" role="status"
                             aria-live="polite">Showing {page.pageNumber * page.pageSize + 1} to {(page.pageNumber * page.pageSize) + page.pageSize} of {page.total} entries
                        </div>
                    </div>
                    <div className={"col-4"}>
                        <nav className="pull-right" aria-label="Page navigation">
                            <ul className="pagination">
                                <li className="page-item">
                                    <a href="/#" className="page-link" onClick={prev} aria-label="Previous">
                                        <span aria-hidden="true">Prev</span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                </li>
                                {pages.map((pageNumber: any,index) => (
                                    <li key={'page'+index} className={`page-item ${pageNumber === page.pageNumber ? 'active' : ''}`}>
                                        <a className="page-link" data-page={pageNumber}
                                           onClick={changePage} href="/#">{pageNumber + 1}</a>
                                    </li>
                                ))}
                                <li className="page-item">
                                    <a className="page-link" onClick={next} aria-label="Next" href="/#">
                                        <span aria-hidden="true">Next</span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );


}

export default DataTable;
