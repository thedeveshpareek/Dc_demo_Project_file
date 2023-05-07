package com.multipixeltec.dcservice.controller;

import com.multipixeltec.dcservice.dto.ConfigurationDto;
import com.multipixeltec.dcservice.dto.MailConfigurationDto;
import com.multipixeltec.dcservice.dto.SmsConfigurationDto;
import com.multipixeltec.dcservice.model.Configuration;
import com.multipixeltec.dcservice.service.ConfigurationService;
import com.multipixeltec.dcservice.util.FileService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1")
public class ConfigurationController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final ConfigurationService configurationService;
    private final FileService fileService;
    @Value("${application.protocol}")
    private String protocol;

    public ConfigurationController(ConfigurationService configurationService, FileService fileService) {
        this.configurationService = configurationService;
        this.fileService = fileService;
    }

    @PostMapping("/configuration")
    public Configuration save(@RequestBody Configuration configuration){
        List<Configuration> values = configurationService.findAll();
        if (values != null && values.size() != 0){
            configuration.setId(values.get(0).getId());
            configuration.setLogo(values.get(0).getLogo());
        }
        return configurationService.save(configuration);
    }

    @PostMapping(value = "/configuration/business",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Configuration saveBusiness(@ModelAttribute ConfigurationDto dto,@RequestHeader(HttpHeaders.HOST) String host){
        List<Configuration> values = configurationService.findAll();
        Configuration configuration = new Configuration();
        if (values != null && values.size() != 0){
            configuration = values.get(0);
        }
        if (dto.getLogo()!=null){
            String path = protocol+host.concat("/resource/")+fileService.saveFile("reports",dto.getLogo());
            configuration.setLogo(path);
        }
        configuration.setBusinessName(dto.getBusinessName());
        configuration.setCurrency(dto.getCurrency());
        configuration.setDateFormat(dto.getDateFormat());
        return configurationService.save(configuration);
    }

    @PostMapping("/configuration/email")
    public Configuration saveMail(@RequestBody MailConfigurationDto dto){
        List<Configuration> values = configurationService.findAll();
        Configuration configuration = new Configuration();
        if (values != null && values.size() != 0){
            configuration = values.get(0);
        }
        configuration.setMailDriver(dto.getMailDriver());
        configuration.setMailHost(dto.getMailHost());
        configuration.setMailPort(dto.getMailPort());
        configuration.setMailUsername(dto.getMailUsername());
        configuration.setMailPassword(dto.getMailPassword());
        configuration.setMailEncryption(dto.getMailEncryption());
        configuration.setMailFromAddress(dto.getMailFromAddress());
        configuration.setMailFromName(dto.getMailFromName());
        return configurationService.save(configuration);
    }

    @PostMapping(value = "/configuration/report",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Configuration saveReport(@ModelAttribute ConfigurationDto dto,@RequestHeader(HttpHeaders.HOST) String host){
        List<Configuration> values = configurationService.findAll();
        Configuration configuration = new Configuration();
        if (values != null && values.size() != 0){
            configuration = values.get(0);
        }
        if (dto.getReportCompanyLogo()!=null){
            String path = protocol+host.concat("/resource/")+fileService.saveFile("logo",dto.getReportCompanyLogo());
            configuration.setReportCompanyLogo(path);
        }
        if (dto.getReportDoctorSeal()!=null){
            String path = protocol+host.concat("/resource/")+fileService.saveFile("seal",dto.getReportDoctorSeal());
            configuration.setReportDoctorSeal(path);
        }
        configuration.setReportAddress(dto.getReportAddress());
        configuration.setReportEmail(dto.getReportEmail());
        configuration.setReportContactNumber(dto.getReportContactNumber());
        return configurationService.save(configuration);
    }

    @PostMapping("/configuration/sms")
    public Configuration saveReport(@RequestBody SmsConfigurationDto dto){
        List<Configuration> values = configurationService.findAll();
        Configuration configuration = new Configuration();
        if (values != null && values.size() != 0){
            configuration = values.get(0);
        }
        configuration.setSmsService(dto.getSmsService());
        configuration.setSmsUrl(dto.getSmsUrl());
        configuration.setSmsMethod(dto.getSmsMethod());
        configuration.setSmsHeader1key(dto.getSmsHeader1key());
        configuration.setSmsHeader1value(dto.getSmsHeader1value());
        configuration.setSmsHeader2key(dto.getSmsHeader2key());
        configuration.setSmsHeader2value(dto.getSmsHeader2value());
        configuration.setSmsHeader3key(dto.getSmsHeader3key());
        configuration.setSmsHeader3value(dto.getSmsHeader3value());
        configuration.setSmsParameter1key(dto.getSmsParameter1key());
        configuration.setSmsParameter1value(dto.getSmsParameter1value());
        configuration.setSmsParameter2key(dto.getSmsParameter2key());
        configuration.setSmsParameter2value(dto.getSmsParameter2value());
        configuration.setSmsParameter3key(dto.getSmsParameter3key());
        configuration.setSmsParameter3value(dto.getSmsParameter3value());
        configuration.setSmsParameter4key(dto.getSmsParameter4key());
        configuration.setSmsParameter4value(dto.getSmsParameter4value());
        configuration.setSmsParameter5key(dto.getSmsParameter5key());
        configuration.setSmsParameter5value(dto.getSmsParameter5value());
        return configurationService.save(configuration);
    }

    @PostMapping(value = "/configuration/invoice",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Configuration saveInvoice(@ModelAttribute ConfigurationDto dto,@RequestHeader(HttpHeaders.HOST) String host){
        List<Configuration> values = configurationService.findAll();
        Configuration configuration = new Configuration();
        if (values != null && values.size() != 0){
            configuration = values.get(0);
        }
        if (dto.getInvoiceLogo()!=null){
            String path = protocol+host.concat("/resource/")+fileService.saveFile("logo",dto.getInvoiceLogo());
            configuration.setInvoiceLogo(path);
        }
        if (dto.getInvoiceSeal()!=null){
            String path = protocol+host.concat("/resource/")+fileService.saveFile("seal",dto.getInvoiceSeal());
            configuration.setInvoiceSeal(path);
        }
        configuration.setInvoiceAddress(dto.getInvoiceAddress());
        configuration.setInvoiceContactNumber(dto.getInvoiceContactNumber());
        configuration.setInvoiceEmail(dto.getInvoiceEmail());
        configuration.setWebsiteUrl(dto.getWebsiteUrl());
        configuration.setReportUrl(dto.getReportUrl());
        return configurationService.save(configuration);
    }

    @GetMapping("/configuration/{id}")
    public Optional<Configuration> getById(@PathVariable(value = "id") Long id){
        return configurationService.find(id);
    }

    @GetMapping("/configuration")
    public Configuration getAll(){
        return configurationService.findAll().get(0);
    }
}
