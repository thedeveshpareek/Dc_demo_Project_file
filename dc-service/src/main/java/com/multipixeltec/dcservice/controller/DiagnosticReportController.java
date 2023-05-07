package com.multipixeltec.dcservice.controller;

import com.multipixeltec.dcservice.dto.DiagnosticReportDto;
import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.enums.ReportStatus;
import com.multipixeltec.dcservice.model.DiagnosticReport;
import com.multipixeltec.dcservice.model.Patient;
import com.multipixeltec.dcservice.model.TestOrPackage;
import com.multipixeltec.dcservice.service.DiagnosticReportService;
import com.multipixeltec.dcservice.service.PatientService;
import com.multipixeltec.dcservice.service.TestOrPackageService;
import com.multipixeltec.dcservice.util.CommonUtil;
import com.multipixeltec.dcservice.util.FileService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

@RestController
@RequestMapping("api/v1")
@Transactional
public class DiagnosticReportController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final DiagnosticReportService diagnosticreportService;
    private final TestOrPackageService testOrPackageService;
    private final PatientService patientService;

    private final FileService fileService;

    @Value("${application.protocol}")
    private String protocol;

    public DiagnosticReportController(DiagnosticReportService diagnosticreportService, TestOrPackageService testOrPackageService, PatientService patientService, FileService fileService) {
        this.diagnosticreportService = diagnosticreportService;
        this.testOrPackageService = testOrPackageService;
        this.patientService = patientService;
        this.fileService = fileService;
    }

    @Transactional
    @PostMapping(value = "/diagnostic-report",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public DiagnosticReport save(@ModelAttribute DiagnosticReportDto reportDto,@RequestHeader(HttpHeaders.HOST) String host) {
        AtomicReference<DiagnosticReport> diagnosticReport = new AtomicReference<>(new DiagnosticReport());
        diagnosticReport.get().setStatus(ReportStatus.PENDING);
        if (reportDto.getId() != null){
            Optional<DiagnosticReport> report = diagnosticreportService.find(reportDto.getId());
            report.ifPresent(diagnosticReport1 -> {
                diagnosticReport.set(diagnosticReport1);});
        }
        if (reportDto.getPatientId()!=null){
            Optional<Patient> optional = patientService.find(reportDto.getPatientId());
            optional.ifPresent(value -> diagnosticReport.get().setPatient(value));
        }
        if (reportDto.getTestId()!=null){
            Optional<TestOrPackage> optional = testOrPackageService.find(reportDto.getTestId());
            optional.ifPresent(value -> diagnosticReport.get().setTest(value));
        }
        if (reportDto.getAttachment()!=null){
            String path = protocol+host.concat("/resource/")+fileService.saveFile("reports",reportDto.getAttachment());
            diagnosticReport.get().setAttachment(path);
            diagnosticReport.get().setStatus(ReportStatus.COMPLETED);
        }
        diagnosticReport.get().setDescription(reportDto.getDescription());
        return diagnosticreportService.save(diagnosticReport.get());
    }
    @GetMapping("/diagnostic-report/{id}")
    public Optional<DiagnosticReport> getById(@PathVariable(value = "id") Long id) {
        return diagnosticreportService.find(id);
    }

    @GetMapping("/diagnostic-report")
    public List<DiagnosticReport> getAll() {
        return diagnosticreportService.findAll();
    }

    @GetMapping("/diagnostic-report/by-patient/{patientId}")
    public List<DiagnosticReport> getAllByPatient(@PathVariable(value = "patientId") Long patientId) {
        logger.info(patientId.toString());
        return diagnosticreportService.findAllByPatient(patientId);
    }

    @DeleteMapping("/diagnostic-report/{id}")
    public void deleteById(@PathVariable(value = "id") Long id) {
        diagnosticreportService.delete(id);
    }

    @DeleteMapping("/diagnostic-report")
    public void deleteAll() {
        diagnosticreportService.deleteAll();
    }

    @GetMapping("/diagnostic-report/count")
    public long count() {
        return diagnosticreportService.count();
    }

    @PostMapping("/diagnostic-report/advanced")
    public PageDetails getAll(@RequestBody PageDetails details) {
        Pageable pageable = PageRequest.of(details.getPageNumber(), details.getPageSize(), Sort.by("id").descending());
        Page<DiagnosticReport> page;
        if (details.getText() == null || details.getText().isEmpty()) {
            page = diagnosticreportService.findAll(details, pageable);
        } else {
            page = diagnosticreportService.findAllByText(details, pageable);
        }
        details.setData(page.getContent());
        details.setTotal(page.getTotalElements());
        return details;
    }

    @GetMapping("/diagnostic-report/init")
    public List<DiagnosticReport> init() {
        List<DiagnosticReport> reports = new ArrayList<>();
        for (int i = 0; i < 500; i++) {
            int count = CommonUtil.getRandomNumber(5, 70);
            String text = CommonUtil.generateRandomStringWithSpace(count);
            DiagnosticReport diagnosticReport = new DiagnosticReport();
            diagnosticReport.setAttachment(CommonUtil.generateRandomString(count).concat(".pdf"));
            diagnosticReport.setDescription(text);
            testOrPackageService.find((long) i).ifPresent(testOrPackage -> diagnosticReport.setTest(testOrPackage));
            patientService.find(1l).ifPresent(patient -> diagnosticReport.setPatient(patient));
            reports.add(diagnosticReport);
            logger.info(i + " " + text);
        }
        return diagnosticreportService.saveAll(reports);
    }
}
