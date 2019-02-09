package com.health.healthtel.rest

import com.health.healthtel.dto.ResponseDto
import com.health.healthtel.entities.Client
import com.health.healthtel.repository.ClientRepository
import org.springframework.data.domain.Example
import org.springframework.data.domain.PageRequest
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@CrossOrigin
@RestController
class ClientRest(private val clientRepo: ClientRepository) {

    @GetMapping("clients")
    fun getAllClients(
            @RequestParam(value = "id", required = false) id: Long?,
            @RequestParam(value = "firstname", required = false) firstname: String?,
            @RequestParam(value = "lastname", required = false) lastname: String?,
            @RequestParam(value = "patronymic", required = false) patronymic: String?,
            @RequestParam(value = "email", required = false) email: String?,
            @RequestParam(value = "size", required = false, defaultValue = "10") size: Int,
            @RequestParam(value = "page", required = false, defaultValue = "0") page: Int
    ): ResponseDto<Client> {
        val clientExample = Example.of(Client(id = id,
                firstname = firstname,
                lastname = lastname,
                patronymic = patronymic,
                email = email))

        val page = PageRequest.of(page, size)
        val result = clientRepo.findAll(clientExample, page)

        return ResponseDto(result.content, clientRepo.count())
    }

   @PostMapping("clients")
    fun addClient(@RequestBody client: Client){
        clientRepo.save(client)
    }

    @DeleteMapping("clients/{id}")
     fun removeClients(@PathVariable("id") id: Long){
        clientRepo.deleteById(id)
    }

    @PatchMapping("/clients")
     fun updateClients(@RequestBody client: Client): ResponseEntity<Client> {
        if(client.id != null) {
           if (clientRepo.findById(client.id).isPresent) {
               clientRepo.save(client)
               return ResponseEntity(HttpStatus.OK)
           } else {
               return ResponseEntity(HttpStatus.NOT_ACCEPTABLE)
           }

        } else {
            return ResponseEntity(HttpStatus.BAD_REQUEST)
        }
    }

}