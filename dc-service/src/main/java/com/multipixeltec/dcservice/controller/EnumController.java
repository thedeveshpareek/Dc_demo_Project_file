package com.multipixeltec.dcservice.controller;

import com.multipixeltec.dcservice.enums.Gender;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/enum")
public class EnumController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @GetMapping("/gender")
    public Gender[] getGenders(){
        return Gender.values();
    }
}
