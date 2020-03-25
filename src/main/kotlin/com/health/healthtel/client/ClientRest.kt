package com.health.healthtel.client

import com.health.healthtel.dto.common.MessageDto
import com.health.healthtel.dto.common.ResponseDto
import com.health.healthtel.client.dto.ClientInlineInfo
import com.health.healthtel.client.dto.CreateClientDTO
import org.springframework.data.domain.Example
import org.springframework.data.domain.PageRequest
import org.springframework.web.bind.annotation.*

@CrossOrigin
@RestController
class ClientRest(private val clientRepo: ClientRepository, private val clientService: ClientService) {

    @GetMapping("clients")
    fun getAllClients(
            @RequestParam(value = "id", required = false) id: Long?,
            @RequestParam(value = "firstname", required = false) firstname: String?,
            @RequestParam(value = "lastname", required = false) lastname: String?,
            @RequestParam(value = "patronymic", required = false) patronymic: String?,
            @RequestParam(value = "email", required = false) email: String?,
            @RequestParam(value = "size", required = false, defaultValue = "10") size: Int,
            @RequestParam(value = "page", required = false, defaultValue = "1") page: Int
    ): ResponseDto<ClientEntity> {
        val clientExample = Example.of(ClientEntity(id = id,
                firstname = firstname,
                lastname = lastname,
                patronymic = patronymic,
                email = email))

        val page = PageRequest.of(page - 1, size)
        val result = clientRepo.findAll(clientExample, page)

        return ResponseDto(result.content, (clientRepo.count() / size) - 1, true)
    }

    @GetMapping("inlineclients")
    fun getAllInlineClients(
            @RequestParam(value = "id", required = false) id: Long?,
            @RequestParam(value = "firstname", required = false) firstname: String?,
            @RequestParam(value = "lastname", required = false) lastname: String?,
            @RequestParam(value = "patronymic", required = false) patronymic: String?,
            @RequestParam(value = "email", required = false) email: String?,
            @RequestParam(value = "size", required = false, defaultValue = "10") size: Int,
            @RequestParam(value = "page", required = false, defaultValue = "1") page: Int
    ): ResponseDto<ClientInlineInfo> {
        val clientExample = Example.of(ClientEntity(id = id,
                firstname = firstname,
                lastname = lastname,
                patronymic = patronymic,
                email = email))

        var resultContent = clientService.getClientInfo(id, firstname, lastname, patronymic, email, size, page)

        return ResponseDto(resultContent, (clientRepo.count() / size) - 1, true)
    }

   @PostMapping("clients")
    fun addClient(@RequestBody clientDTO: CreateClientDTO): MessageDto {
          System.out.println("got this" + clientDTO.toString())
          clientService.createNewClient(clientDTO)
        return MessageDto(true, "clientEntity was created")
    }

    @DeleteMapping("clients/{id}")
     fun removeClients(@PathVariable("id") id: Long): MessageDto {
        clientRepo.deleteById(id)
        return MessageDto(true, "client was deleted")
    }

    @PatchMapping("/clients")
     fun updateClients(@RequestBody clientEntity: ClientEntity): MessageDto {
        if(clientEntity.id != null) {
           if (clientRepo.findById(clientEntity.id).isPresent) {
               clientRepo.save(clientEntity)
               return MessageDto(true, "clientEntity was updated")
           } else {
               return MessageDto(false, "can not find clientEntity by id " + clientEntity.id)
           }

        } else {
            return MessageDto(false, "error during update of clientEntity")
        }
    }

}