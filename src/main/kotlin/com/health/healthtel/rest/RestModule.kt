package com.health.healthtel.rest

import com.health.healthtel.entities.Employees
import com.health.healthtel.repository.EmployeeRepository
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import javax.ws.rs.GET

@Controller
class RestModule {



    @GetMapping("/")
    fun  hello() = "index.html"

}

