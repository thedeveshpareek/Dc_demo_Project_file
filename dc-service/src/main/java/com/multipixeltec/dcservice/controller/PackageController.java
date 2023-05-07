package com.multipixeltec.dcservice.controller;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.dto.TestOrPackageDto;
import com.multipixeltec.dcservice.enums.ActiveStatus;
import com.multipixeltec.dcservice.enums.TestPackage;
import com.multipixeltec.dcservice.exceptions.NotFoundException;
import com.multipixeltec.dcservice.model.PackageItem;
import com.multipixeltec.dcservice.model.TestOrPackage;
import com.multipixeltec.dcservice.service.PackageItemService;
import com.multipixeltec.dcservice.service.TestOrPackageService;
import com.multipixeltec.dcservice.util.CommonUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/diagnostic")
@Transactional
public class PackageController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final TestPackage type = TestPackage.PACKAGE;
    private final TestOrPackageService testorpackageService;
    private final PackageItemService packageItemService;

    public PackageController(TestOrPackageService testorpackageService, PackageItemService packageItemService) {
        this.testorpackageService = testorpackageService;
        this.packageItemService = packageItemService;
    }

    @PutMapping("/package")
    public TestOrPackage save(@RequestBody TestOrPackageDto dto){
        TestOrPackage testOrPackage = new TestOrPackage();
        testOrPackage.setId(dto.getId());
        testOrPackage.setName(dto.getName());
        testOrPackage.setPrice(dto.getPrice());
        testOrPackage.setDescription(dto.getDescription());
        testOrPackage.setAbbreviation(dto.getAbbreviation());
        testOrPackage.setActiveStatus(ActiveStatus.valueOf(dto.getActiveStatus().toUpperCase()));
        testOrPackage.setType(type);
        TestOrPackage savedPackage = testorpackageService.save(testOrPackage);
        List<TestOrPackage> tests = testorpackageService.findAllById(new HashSet<>(dto.getTestIds()));
        List<PackageItem> items = new ArrayList<>();
        for (TestOrPackage test : tests) {
            PackageItem item = new PackageItem();
            item.setPkg(savedPackage);
            item.setTest(test);
            items.add(item);
        }
        packageItemService.saveAll(items);
        return savedPackage;
    }

    @PostMapping("/package")
    public TestOrPackage update(@RequestBody TestOrPackageDto dto){
        Optional<TestOrPackage> orPackage = testorpackageService.find(dto.getId());
        TestOrPackage testOrPackage;
        if (orPackage.isPresent()){
            testOrPackage = orPackage.get();
            testOrPackage.setName(dto.getName());
            testOrPackage.setPrice(dto.getPrice());
            testOrPackage.setDescription(dto.getDescription());
            testOrPackage.setAbbreviation(dto.getAbbreviation());
            testOrPackage.setActiveStatus(ActiveStatus.valueOf(dto.getActiveStatus().toUpperCase()));
            return testorpackageService.save(testOrPackage);
        }else {
            throw new NotFoundException("Package not fround for given id : "+dto.getId());
        }
    }

    @GetMapping("/package/{id}")
    public Optional<TestOrPackage> getById(@PathVariable(value = "id") Long id){
        return testorpackageService.find(id);
    }

    @GetMapping("/package")
    public List<TestOrPackage> getAll(){
        return testorpackageService.findAll(type);
    }

    @DeleteMapping("/package/{id}")
    public void deleteById(@PathVariable(value = "id") Long id){
        testorpackageService.delete(id);
    }

    @GetMapping("/package/count")
    public long count(){
        return testorpackageService.count(type);
    }

    @PostMapping("/package/advanced")
    public PageDetails getAll(@RequestBody PageDetails page) {
        Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), Sort.by("id").descending());
        Page<TestOrPackage> agentPage;
        if (page.getText()==null || page.getText().isEmpty()){
            agentPage = testorpackageService.findAllByType(type.toString(),pageable);
        }else{
            agentPage = testorpackageService.findAllByTextAndType(type.toString(),page,pageable);
        }
        page.setData(agentPage.getContent());
        page.setTotal(agentPage.getTotalElements());
        return page;
    }

    @GetMapping("/package/init")
    public List<TestOrPackage> init(){
        List<TestOrPackage> testOrPackages = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            int count = CommonUtil.getRandomNumber(5, 40);
            int count2 = CommonUtil.getRandomNumber(5, 10);
            TestOrPackage testOrPackage = new TestOrPackage();
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
