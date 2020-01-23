package com.health.healthtel.rest


import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping

@Controller
class RestModule {

    @GetMapping("/")
    fun  start(): String {
        print("requested index")
        return "index.html"
    }

}

