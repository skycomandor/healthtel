package com.health.healthtel.rest

import com.health.healthtel.dto.common.MessageDto
import com.health.healthtel.dto.common.ResponseDto
import com.health.healthtel.entities.Phones
import com.health.healthtel.repository.PhoneRepository
import org.springframework.data.domain.Example
import org.springframework.data.domain.PageRequest
import org.springframework.web.bind.annotation.*

@CrossOrigin
@RestController
class PhonesRest(private val phoneRepository: PhoneRepository){

    @GetMapping("phones")
    fun getAllPhones(@RequestParam(value = "id", required = false) id: Long,
                    @RequestParam(value = "clientId", required = false) clientId: Long,
                    @RequestParam(value = "phone", required = false) phone: String,
                    @RequestParam(value = "size", required = false, defaultValue = "10") size: Int,
                    @RequestParam(value = "page", required = false, defaultValue = "0") page: Int): ResponseDto<Phones> {
        val clientExample = Example.of(Phones(id = id,
                clientId = clientId,
                phone = phone
        ))
        val page = PageRequest.of(page, size)
        val result = phoneRepository.findAll(clientExample, page)
        return ResponseDto(result.content, (phoneRepository.count() / size) - 1, true)
    }

    @PostMapping("phones")
    fun addPhones(@RequestBody phones: Phones): MessageDto {
        phoneRepository.save(phones)
        return MessageDto(true, "phone was created")
    }

    @DeleteMapping("phones/{id}")
    fun removePhones(@PathVariable("id") id: Long): MessageDto {
        phoneRepository.deleteById(id)
        return MessageDto(true, "phone was deleted")
    }

    @PatchMapping("phones")
    fun updatePhones(@RequestBody phones: Phones): MessageDto {
        if(phones.id != null) {
            if (phoneRepository.findById(phones.id).isPresent) {
                phoneRepository.save(phones)
                return return MessageDto(true, "phone was updated")
            } else {
                return MessageDto(false, "can not find phone by id " + phones.id)
            }
        } else {
            return MessageDto(false, "error during update of phone")
        }
    }
}