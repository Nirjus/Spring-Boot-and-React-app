package com.nirjus.simpleWebApp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @RequestMapping("/")
    public String greet(){
        System.out.println("I am here");
        return "Welcome to Home";
    }

    @RequestMapping("/about")
    public String about(){
        return "We don't care, just Build";
    }
}
