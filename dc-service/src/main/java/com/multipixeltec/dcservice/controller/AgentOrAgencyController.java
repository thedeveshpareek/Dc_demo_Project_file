package com.multipixeltec.dcservice.controller;

import com.multipixeltec.dcservice.dto.AgentOrAgencyDto;
import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.enums.AgentAgency;
import com.multipixeltec.dcservice.model.AgentOrAgency;
import com.multipixeltec.dcservice.service.AgentOrAgencyService;
import com.multipixeltec.dcservice.util.CommonUtil;
import org.modelmapper.ModelMapper;
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
@RequestMapping("api/v1/agentoragency")
public class AgentOrAgencyController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private AgentOrAgencyService agentoragencyService;

    @PostMapping("/{type}")
    public AgentOrAgency save(@PathVariable("type") String type,@RequestBody AgentOrAgency agentoragency){
        AgentAgency agentAgencyType = AgentAgency.valueOf(type.toUpperCase());
        agentoragency.setType(agentAgencyType);
        return agentoragencyService.save(agentoragency);
    }

    @GetMapping("/{type}/{id}")
    public Optional<AgentOrAgency> getById(@PathVariable("type") String type,@PathVariable(value = "id") Long id){
        return agentoragencyService.find(id);
    }

    @GetMapping("/{type}")
    public List<AgentOrAgency> getAll(@PathVariable("type") String type){
        AgentAgency agentAgencyType = AgentAgency.valueOf(type.toUpperCase());
        return agentoragencyService.findAll(agentAgencyType);
    }

    @GetMapping("")
    public List<AgentOrAgency> getAll(){
        return agentoragencyService.findAll();
    }

    @DeleteMapping("/{type}/{id}")
    public void deleteById(@PathVariable("type") String type,@PathVariable(value = "id") Long id){
        agentoragencyService.delete(id);
    }

    @DeleteMapping("/agentoragency")
    public void deleteAll(){
        agentoragencyService.deleteAll();
    }

    @GetMapping("/{type}/count")
    public long count(@PathVariable("type") String type){
        AgentAgency agentAgencyType = AgentAgency.valueOf(type.toUpperCase());
        return agentoragencyService.count(agentAgencyType);
    }

    @PostMapping("/{type}/advanced")
    public PageDetails getAll(@PathVariable("type") String type,@RequestBody PageDetails page) {
        Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), Sort.by("id").descending());
        Page<AgentOrAgency> agentPage = null;
        if (page.getText()==null || page.getText().isEmpty()){
            agentPage = agentoragencyService.findAllByType(type,page,pageable);
        }else{
            agentPage = agentoragencyService.findAllByTextAndType(type,page,pageable);
        }
        page.setData(agentPage.getContent());
        page.setTotal(agentPage.getTotalElements());
        return page;
    }

    @GetMapping("/{type}/init")
    public List<AgentOrAgency> init(@PathVariable("type") String type){
        AgentAgency agentAgencyType = AgentAgency.valueOf(type.toUpperCase());
        List<AgentOrAgency> agentOrAgencyList = new ArrayList<>();
        for (int i = 0; i < 500; i++) {
            int count = CommonUtil.getRandomNumber(5, 15);
            String text = CommonUtil.generateRandomStringWithSpace(count);
            AgentOrAgency agentOrAgency = new AgentOrAgency();
            agentOrAgency.setFullName(text);
            agentOrAgency.setEmail(text.replace(" ","_").concat("@gmail.com"));
            agentOrAgency.setMobile("077"+CommonUtil.generateRandomNumber(7));
            agentOrAgency.setAddress(CommonUtil.generateRandomString(count));
            agentOrAgency.setCommissionRate(CommonUtil.getRandomNumber(1, 100).doubleValue());
            agentOrAgency.setCommissionAmount(CommonUtil.getRandomNumber(1, 2000).doubleValue());
            agentOrAgency.setType(agentAgencyType);
            agentOrAgencyList.add(agentOrAgency);
            logger.info(i+" "+text);
        }
        return agentoragencyService.saveAll(agentOrAgencyList);
    }
}
