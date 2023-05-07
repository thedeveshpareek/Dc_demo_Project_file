package com.multipixeltec.dcservice.controller;

import com.multipixeltec.dcservice.model.Configuration;
import com.multipixeltec.dcservice.model.Patient;
import com.multipixeltec.dcservice.model.PatientReport;
import com.multipixeltec.dcservice.service.ConfigurationService;
import com.multipixeltec.dcservice.service.PatientReportService;
import com.multipixeltec.dcservice.service.PatientService;
import com.multipixeltec.dcservice.service.SmsService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1")
public class PatientReportController {

    @Value("${application.protocol}")
    private String protocol;
    private final PatientReportService patientreportService;
    private final PatientService patientService;
    private final SmsService smsService;
    private final ConfigurationService configurationService;

    public PatientReportController(PatientReportService patientreportService, PatientService patientService, SmsService smsService, ConfigurationService configurationService) {
        this.patientreportService = patientreportService;
        this.patientService = patientService;
        this.smsService = smsService;
        this.configurationService = configurationService;
    }

    @PostMapping("/patient/report")
    public PatientReport save(@RequestBody PatientReport patientreport,@RequestHeader(HttpHeaders.HOST) String host){
        Optional<Patient> patient = patientService.find(patientreport.getPatientId());
        if (patient.isPresent()){
            patient.ifPresent(patient1 -> patientreport.setPatient(patient1));
        }
        PatientReport report = patientreportService.save(patientreport);

        String reportUrl = "";
        Optional<Configuration> first = configurationService.findFirst();
        if (first.isPresent()){
            Configuration configuration = first.get();
            if (configuration.getReportUrl() != null) {
                reportUrl = configuration.getReportUrl();
                reportUrl = reportUrl.replace("www.",protocol);
            }
        }
        if (report.getStatus() != null){
            String message = "";
            message = message.concat("Dear ").concat(report.getPatient().getFullName()).concat("\n")
                    .concat("Your Medical report is '").concat(report.getStatus().name()).concat("'.\n")
                    .concat("Please go to ").concat(reportUrl).concat(" for download your report.\n")
                    .concat("Thank You").concat("\n")
                    .concat("Medical Services");
            smsService.send(report.getPatient().getMobile(),message);
        }
        return report;
    }

    @GetMapping("/patient/report/{id}")
    public Optional<PatientReport> getById(@PathVariable(value = "id") Long id){
        return patientreportService.find(id);
    }

    @GetMapping("/patient/report")
    public List<PatientReport> getAll(){
        return patientreportService.findAll();
    }

    @DeleteMapping("/patient/report/{id}")
    public void deleteById(@PathVariable(value = "id") Long id){
        patientreportService.delete(id);
    }

    @DeleteMapping("/patient/report")
    public void deleteAll(){
        patientreportService.deleteAll();
    }

    @GetMapping("/patient/report/count")
    public long count(){
        return patientreportService.count();
    }
}
