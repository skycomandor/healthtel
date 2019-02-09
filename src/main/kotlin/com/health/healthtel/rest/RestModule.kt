package com.health.healthtel.rest


import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping

@CrossOrigin(origins = ["http://localhost:4200"], maxAge = 3600)
@Controller
class RestModule {

    @GetMapping("/")
    fun  start() = "index.html"

}

