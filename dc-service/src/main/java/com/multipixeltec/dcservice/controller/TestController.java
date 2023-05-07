package com.multipixeltec.dcservice.controller;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.enums.ActiveStatus;
import com.multipixeltec.dcservice.enums.TestPackage;
import com.multipixeltec.dcservice.model.TestOrPackage;
import com.multipixeltec.dcservice.service.TestOrPackageService;
import com.multipixeltec.dcservice.util.CommonUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/diagnostic")
public class TestController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private TestPackage type = TestPackage.TEST;
    @Autowired
    private TestOrPackageService testorpackageService;

    @PostMapping("/test")
    public TestOrPackage save(@RequestBody TestOrPackage testorpackage){
        testorpackage.setType(type);
        return testorpackageService.save(testorpackage);
    }

    @GetMapping("/test/{id}")
    public Optional<TestOrPackage> getById(@PathVariable(value = "id") Long id){
        return testorpackageService.find(id);
    }

    @GetMapping("/test")
    public List<TestOrPackage> getAllByType(){
        return testorpackageService.findAll(type);
    }

    @GetMapping("")
    public List<TestOrPackage> getAll(){
        return testorpackageService.findAll();
    }

    @DeleteMapping("/test/{id}")
    public void deleteById(@PathVariable(value = "id") Long id){
        testorpackageService.delete(id);
    }

    @GetMapping("/test/count")
    public long count(){
        return testorpackageService.count(type);
    }

    @PostMapping("/test/advanced")
    public PageDetails getAll(@RequestBody PageDetails page) {
        Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), Sort.by("id").descending());
        Page<TestOrPackage> agentPage = null;
        if (page.getText()==null || page.getText().isEmpty()){
            agentPage = testorpackageService.findAllByType(type.name(),pageable);
        }else{
            agentPage = testorpackageService.findAllByTextAndType(type.name(),page,pageable);
        }
        page.setData(agentPage.getContent());
        page.setTotal(agentPage.getTotalElements());
        return page;
    }

    @GetMapping("/test/init")
    public List<TestOrPackage> init(){
        List<TestOrPackage> testOrPackages = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            int count = CommonUtil.getRandomNumber(5, 40);
            int count2 = CommonUtil.getRandomNumber(5, 10);
            TestOrPackage testOrPackage = new TestOrPackage();
            testOrPackage.setDepartment("Laboratory Investigation");
            testOrPackage.setName(CommonUtil.generateRandomString(count2));
            testOrPackage.setDescription(CommonUtil.generateRandomStringWithSpace(count));
            testOrPackage.setPrice(CommonUtil.getRandomNumber(1, 100).doubleValue());
            testOrPackage.setActiveStatus(ActiveStatus.ACTIVE);
            testOrPackage.setType(type);
            testOrPackages.add(testOrPackage);
        }
        return testorpackageService.saveAll(testOrPackages);
    }
}
