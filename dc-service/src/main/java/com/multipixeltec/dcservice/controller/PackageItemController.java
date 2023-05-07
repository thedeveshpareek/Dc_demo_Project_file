package com.multipixeltec.dcservice.controller;

import com.multipixeltec.dcservice.model.PackageItem;
import com.multipixeltec.dcservice.model.TestOrPackage;
import com.multipixeltec.dcservice.service.PackageItemService;
import com.multipixeltec.dcservice.service.TestOrPackageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1")
public class PackageItemController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private PackageItemService packageitemService;

    @Autowired
    private TestOrPackageService testOrPackageService;

    @PostMapping("/package-item")
    public ResponseEntity<PackageItem> save(@RequestBody PackageItem packageitem){
        Optional<PackageItem> optional = packageitemService.findByPackageAndTest(packageitem.getPkgId(),packageitem.getTestId());
        if (optional.isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        Optional<TestOrPackage> orPackage = testOrPackageService.find(packageitem.getPkgId());
        Optional<TestOrPackage> orTest = testOrPackageService.find(packageitem.getTestId());
        if (!orPackage.isPresent() || !orTest.isPresent()){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        packageitem.setPkg(orPackage.get());
        packageitem.setTest(orTest.get());
        return ResponseEntity.ok(packageitemService.save(packageitem));
    }

    @GetMapping("/package-item/{id}")
    public Optional<PackageItem> getById(@PathVariable(value = "id") Long id){
        return packageitemService.find(id);
    }

    @GetMapping("/package-item")
    public List<PackageItem> getAll(){
        return packageitemService.findAll();
    }

    @GetMapping("/package-item/by-package/{id}")
    public List<PackageItem> getAllByPackageId(@PathVariable(value = "id") Long packageId){
        return packageitemService.findAllByPackageId(packageId);
    }

    @DeleteMapping("/package-item/{id}")
    public void deleteById(@PathVariable(value = "id") Long id){
        packageitemService.delete(id);
    }

    @DeleteMapping("/package-item/{package}/{test}")
    public ResponseEntity<Object> deleteByPackageAndTest(@PathVariable("package") Long pkgId,@PathVariable("test") Long testId){
        Optional<PackageItem> optional = packageitemService.findByPackageAndTest(pkgId,testId);
        if (optional.isPresent()){
            packageitemService.delete(optional.get());
            return ResponseEntity.ok("success");
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/package-item")
    public void deleteAll(){
        packageitemService.deleteAll();
    }

    @GetMapping("/package-item/count")
    public long count(){
        return packageitemService.count();
    }
}
