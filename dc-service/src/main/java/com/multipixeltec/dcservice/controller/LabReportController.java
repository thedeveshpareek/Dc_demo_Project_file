package com.multipixeltec.dcservice.controller;

import com.multipixeltec.dcservice.dto.DropdownValueDto;
import com.multipixeltec.dcservice.dto.ExpenseDto;
import com.multipixeltec.dcservice.dto.LabReportDto;
import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.enums.LabReportCategory;
import com.multipixeltec.dcservice.model.Expense;
import com.multipixeltec.dcservice.model.LabReport;
import com.multipixeltec.dcservice.service.LabReportService;
import com.multipixeltec.dcservice.util.FileService;
import com.multipixeltec.dcservice.util.SortColumn;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("api/v1")
public class LabReportController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    @Value("${application.protocol}")
    private String protocol;

    private final FileService fileService;
    private final LabReportService labreportService;

    public LabReportController(FileService fileService, LabReportService labreportService) {
        this.fileService = fileService;
        this.labreportService = labreportService;
    }

    @PostMapping("/lab-report")
    public LabReport save(@RequestBody LabReport labreport){
        return labreportService.save(labreport);
    }

    @GetMapping("/lab-report/{id}")
    public Optional<LabReport> getById(@PathVariable(value = "id") Long id){
        return labreportService.find(id);
    }

    @GetMapping("/lab-report")
    public List<LabReport> getAll(){
        return labreportService.findAll();
    }

    @DeleteMapping("/lab-report/{id}")
    public void deleteById(@PathVariable(value = "id") Long id){
        labreportService.delete(id);
    }

    @DeleteMapping("/lab-report")
    public void deleteAll(){
        labreportService.deleteAll();
    }

    @GetMapping("/lab-report/count")
    public long count(){
        return labreportService.count();
    }

    @PostMapping("/lab-report/advanced")
    public PageDetails advanced(@RequestBody PageDetails page) {
        Sort sort = SortColumn.expenses(page.getColumn(),page.getSort());
        Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);
        Page<LabReport> labReports;
        if (page.getText() == null || page.getText().isEmpty()) {
            labReports = labreportService.findAllByDate(page, pageable);
        } else {
            labReports = labreportService.findAllByDateAndText(page, pageable);
        }
        page.setData(labReports.getContent());
        page.setTotal(labReports.getTotalElements());
        return page;
    }

    @PostMapping(path = "/lab-report/upload",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public List<LabReport> upload(@ModelAttribute LabReportDto labReportDto, @RequestHeader(HttpHeaders.HOST) String host) {
        Pattern pattern = Pattern.compile(".*[/\\\\]([^/\\\\]+)$"); // Match last path segment
        List<LabReport> labReports =  new ArrayList<>();
        List<MultipartFile> files = labReportDto.getFiles();
        for (MultipartFile file : files) {
            String originalFileName = fileService.saveFileWithName(labReportDto.getDevice(), file);
            String filepath = protocol+host.concat("/resource/")+originalFileName;
            if (originalFileName != null){
                Matcher matcher = pattern.matcher(originalFileName);
                if (matcher.find()) {
                    String fileName = matcher.group(1);
                    LabReport labReport = new LabReport();
                    labReport.setType(labReport.getType());
                    labReport.setName(fileName);
                    labReport.setFilePath(filepath);
                    labReports.add(labReport);
                }
            }
        }
        labReports = labreportService.saveAll(labReports);
        return labReports;
    }
}
