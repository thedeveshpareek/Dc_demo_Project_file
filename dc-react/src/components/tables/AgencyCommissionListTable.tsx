import React from 'react';

function UserForm(props: any) {
    return (
        <section id="html">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Commission List</h4>
                        </div>
                        <div className="card-header">
                            <div className="form-group">
                                <button type="button"
                                        className="btn btn-outline-secondary btn-min-width mr-1 mb-1">Copy
                                </button>
                                <button type="button"
                                        className="btn btn-outline-secondary btn-min-width mr-1 mb-1">CSV
                                </button>
                                <button type="button"
                                        className="btn btn-outline-secondary btn-min-width mr-1 mb-1">Excel
                                </button>
                                <button type="button"
                                        className="btn btn-outline-secondary btn-min-width mr-1 mb-1">PDF
                                </button>
                                <button type="button"
                                        className="btn btn-outline-secondary btn-min-width mr-1 mb-1">Print
                                </button>
                            </div>
                        </div>
                        <div className="card-content  collapse show">
                            <div className="card-body card-dashboard">
                                <div className="table-responsive">
                                    <table className="table table-striped table-bordered sourced-data">
                                        <thead className="bg-primary white">
                                        <tr>
                                            <th>SL.</th>
                                            <th>Patient ID</th>
                                            <th>Name</th>
                                            <th>Mobile Number</th>
                                            <th>Country</th>
                                            <th>Total Bill</th>
                                            <th>Paid</th>
                                            <th>Due</th>
                                            <th>Commission</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>1265489</td>
                                            <td>ASMA AKTER LOVELY</td>
                                            <td>15695442687</td>
                                            <td>India</td>
                                            <td>0.00</td>
                                            <td>0.00</td>
                                            <td>0.00</td>
                                            <td>0.00</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>1265489</td>
                                            <td>ASMA AKTER LOVELY</td>
                                            <td>15695442687</td>
                                            <td>India</td>
                                            <td>0.00</td>
                                            <td>0.00</td>
                                            <td>0.00</td>
                                            <td>0.00</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>1265489</td>
                                            <td>ASMA AKTER LOVELY</td>
                                            <td>15695442687</td>
                                            <td>India</td>
                                            <td>0.00</td>
                                            <td>0.00</td>
                                            <td>0.00</td>
                                            <td>0.00</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default UserForm;
