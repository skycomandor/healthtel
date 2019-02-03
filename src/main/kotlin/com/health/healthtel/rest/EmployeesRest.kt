package com.health.healthtel.rest

import com.health.healthtel.dto.ResponseDto
import com.health.healthtel.entities.Employees
import com.health.healthtel.repository.EmployeeRepository
import org.springframework.data.domain.Example
import org.springframework.data.domain.PageRequest
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
class EmployeesRest(private val employeeRepository: EmployeeRepository) {

    @GetMapping("employee")
    fun getAllEmploees(@RequestParam(value = "id", required = false) id: Long?,
                       @RequestParam(value = "firstname", required = false) firstname: String?,
                       @RequestParam(value = "lastname", required = false) lastname: String?,
                       @RequestParam(value = "patronymic", required = false) patronymic: String?,
                       @RequestParam(value = "login", required = false) login: String?,
                       @RequestParam(value = "size", required = false, defaultValue = "10") size: Int,
                       @RequestParam(value = "page", required = false, defaultValue = "0") page: Int): ResponseDto<Employees> {

        val clientExample = Example.of(Employees(id = id,
                firstname = firstname,
                lastname = lastname,
                patronymic = patronymic,
                login = login))

        val page = PageRequest.of(page, size)
        val result = employeeRepository.findAll(clientExample, page)
        return ResponseDto(result.content, 0)
    }

    @PostMapping("employee")
    fun addClient(@RequestBody employees: Employees){
        employeeRepository.save(employees)
    }

    @DeleteMapping("employee/{id}")
    fun removeClients(@PathVariable("id") id: Long){
        employeeRepository.deleteById(id)
    }

    @PatchMapping("employee")
    fun updateClients(@RequestBody employees: Employees): ResponseEntity<Employees> {
        if(employees.id != null) {
            if (employeeRepository.findById(employees.id).isPresent) {
                employeeRepository.save(employees)
                return ResponseEntity(HttpStatus.OK)
            } else {
                return ResponseEntity(HttpStatus.NOT_ACCEPTABLE)
            }
        } else {
            return ResponseEntity(HttpStatus.BAD_REQUEST)
        }
    }


}
