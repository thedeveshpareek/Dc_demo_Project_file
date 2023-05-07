import React, {useState} from 'react';
import BusinessSettings from "./BusinessSettings";
import EmailSettings from "./EmailSettings";
import SmsSettings from "./SmsSettings";
import InvoiceSettings from "./InvoiceSettings";
import ReportSettings from "./ReportSettings";

function SystemSettingsForm() {
    return (
        <>
            <div className="card">
                <div className="card-content">
                    <div className="card-body">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className="nav-link active" id="base-tab1" data-toggle="tab" aria-controls="tab1" href="#tab1" aria-expanded="true">Business Settings</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="base-tab2" data-toggle="tab" aria-controls="tab2" href="#tab2" aria-expanded="false">Email Settings</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="base-tab3" data-toggle="tab" aria-controls="tab3" href="#tab3" aria-expanded="false">SMS Settings</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="base-tab4" data-toggle="tab" aria-controls="tab4" href="#tab4" aria-expanded="false">Invoice Settings</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="base-tab5" data-toggle="tab" aria-controls="tab5" href="#tab5" aria-expanded="false">Report Settings</a>
                            </li>
                        </ul>
                        <div className="tab-content px-1 pt-1">
                            <div role="tabpanel" className="tab-pane active" id="tab1" aria-expanded="true" aria-labelledby="base-tab1">
                                <BusinessSettings/>
                            </div>
                            <div className="tab-pane" id="tab2" aria-labelledby="base-tab2">
                                <EmailSettings/>
                            </div>
                            <div className="tab-pane" id="tab3" aria-labelledby="base-tab3">
                                <SmsSettings/>
                            </div>
                            <div className="tab-pane" id="tab4" aria-labelledby="base-tab4">
                                <InvoiceSettings/>
                            </div>
                            <div className="tab-pane" id="tab5" aria-labelledby="base-tab4">
                                <ReportSettings/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SystemSettingsForm;
