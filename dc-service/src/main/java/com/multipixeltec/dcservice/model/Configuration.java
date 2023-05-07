package com.multipixeltec.dcservice.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "CONFIGURATION")
public class Configuration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "BUSINESS_NAME",length = 100)
    private String businessName;

    @Column(name = "CURRENCY",length = 20)
    private String currency;

    @Column(name = "DATE_FORMAT",length = 9)
    private String dateFormat;

    @Column(name = "LOGO")
    private String logo;

    @Column(name = "MAIL_DRIVER",length = 10)
    private String mailDriver;

    @Column(name = "MAIL_HOST",length = 50)
    private String mailHost;

    @Column(name = "MAIL_PORT",length = 4)
    private String mailPort;

    @Column(name = "MAIL_USER_NAME",length = 50)
    private String mailUsername;

    @Column(name = "MAIL_PASSWORD",length = 30)
    private String mailPassword;

    @Column(name = "MAIL_ENCRYPTION",length = 50)
    private String mailEncryption;

    @Column(name = "MAIL_FROM_ADDRESS",length = 60)
    private String mailFromAddress;

    @Column(name = "MAIL_FROM_NAME",length = 40)
    private String mailFromName;

    @Column(name = "SMS_SERVICE",length = 15)
    private String smsService;

    @Column(name = "SMS_URL")
    private String smsUrl;

    @Column(name = "SMS_METHOD",length = 15)
    private String smsMethod;

    @Column(name = "SMS_HEADER_1_KEY",length = 40)
    private String smsHeader1key;

    @Column(name = "SMS_HEADER_1_VALUE")
    private String smsHeader1value;

    @Column(name = "SMS_HEADER_2_KEY",length = 40)
    private String smsHeader2key;

    @Column(name = "SMS_HEADER_2_VALUE")
    private String smsHeader2value;

    @Column(name = "SMS_HEADER_3_KEY",length = 40)
    private String smsHeader3key;

    @Column(name = "SMS_HEADER_3_VALUE")
    private String smsHeader3value;

    @Column(name = "SMS_PARAMETER_1_KEY",length = 40)
    private String smsParameter1key;

    @Column(name = "SMS_PARAMETER_1_VALUE")
    private String smsParameter1value;

    @Column(name = "SMS_PARAMETER_2_KEY",length = 40)
    private String smsParameter2key;

    @Column(name = "SMS_PARAMETER_2_VALUE")
    private String smsParameter2value;

    @Column(name = "SMS_PARAMETER_3_KEY",length = 40)
    private String smsParameter3key;

    @Column(name = "SMS_PARAMETER_3_VALUE")
    private String smsParameter3value;

    @Column(name = "SMS_PARAMETER_4_KEY",length = 40)
    private String smsParameter4key;

    @Column(name = "SMS_PARAMETER_4_VALUE")
    private String smsParameter4value;

    @Column(name = "SMS_PARAMETER_5_KEY",length = 40)
    private String smsParameter5key;

    @Column(name = "SMS_PARAMETER_5_VALUE")
    private String smsParameter5value;

    @Column(name = "REPORT_COMPANY_LOGO")
    private String reportCompanyLogo;

    @Column(name = "REPORT_ADDRESS",length = 255)
    private String reportAddress;

    @Column(name = "REPORT_CONTACT_NUMBER",length = 40)
    private String reportContactNumber;

    @Column(name = "REPORT_EMAIL",length = 40)
    private String reportEmail;

    @Column(name = "REPORT_DOCTOR_SEAL")
    private String reportDoctorSeal;

    @Column(name = "INVOICE_LOGO")
    private String invoiceLogo;

    @Column(name = "INVOICE_ADDRESS",length = 255)
    private String invoiceAddress;

    @Column(name = "INVOICE_CONTACT_NUMBER",length = 40)
    private String invoiceContactNumber;

    @Column(name = "INVOICE_EMAIL",length = 40)
    private String invoiceEmail;

    @Column(name = "INVOICE_SEAL")
    private String invoiceSeal;

    @Column(name = "WEBSITE_URL")
    private String websiteUrl;

    @Column(name = "REPORT_URL")
    private String reportUrl;
}
