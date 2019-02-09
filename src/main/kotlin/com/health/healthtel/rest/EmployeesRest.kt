package com.health.healthtel.rest

import com.health.healthtel.dto.MessageDto
import com.health.healthtel.dto.ResponseDto
import com.health.healthtel.entities.Employees
import com.health.healthtel.repository.EmployeeRepository
import org.springframework.data.domain.Example
import org.springframework.data.domain.PageRequest
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@CrossOrigin
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
        return ResponseDto(result.content, 0, true)
    }

    @PostMapping("employee")
    fun addEmploees(@RequestBody employees: Employees): MessageDto{
        employeeRepository.save(employees)
        return MessageDto(true, "employee was created")
    }

    @DeleteMapping("employee/{id}")
    fun removeEmploees(@PathVariable("id") id: Long): MessageDto{
        employeeRepository.deleteById(id)
        return MessageDto(true, "employee was deleted")
    }

    @PatchMapping("employee")
    fun updateEmploees(@RequestBody employees: Employees): MessageDto {
        if(employees.id != null) {
            if (employeeRepository.findById(employees.id).isPresent) {
                employeeRepository.save(employees)
                return MessageDto(true, "employee was updated")
            } else {
                return MessageDto(false, "can not find employee by id " + employees.id)
            }
        } else {
            return MessageDto(false, "error during update of employee")
        }
    }


}
