package com.health.healthtel.rest


import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping


@Controller
class RestModule {

    @GetMapping("/")
    fun  start() = "index.html"

}

