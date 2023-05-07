package com.multipixeltec.dcservice.controller;

import com.multipixeltec.dcservice.model.RefValue;
import com.multipixeltec.dcservice.service.RefValueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1")
public class RefValueController {

    @Autowired
    private RefValueService refvalueService;

    @PostMapping("/ref-value")
    public RefValue save(@RequestBody RefValue refvalue){
        List<RefValue> values = refvalueService.findAll();
        if (values != null && values.size() != 0){
            refvalue.setId(values.get(0).getId());
        }
        return refvalueService.save(refvalue);
    }

    @GetMapping("/ref-value")
    public RefValue getAll(){
        List<RefValue> values = refvalueService.findAll();
        return values.get(0);
    }
}
