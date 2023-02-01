package com.shyd.healthcare.controller.support;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/support")
public class FAQController {
    @GetMapping("/faq")
    public String faq(Model model) {
        String testString = "This is FAQ Backend Test String";
        model.addAttribute("testString", testString );
        return testString;
//        return "This is FAQ Page";
    }
}
