package com.health.healthtel.rest

import com.health.healthtel.entities.Employees
import com.health.healthtel.repository.EmployeeRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class UserRest(private val employeeRepository: EmployeeRepository) {

    @GetMapping("employee")
    fun getAllEmploees(): List<Employees> = employeeRepository.findAll()

}

data class User(val name: String)