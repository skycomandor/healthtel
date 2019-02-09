package com.health.healthtel.rest

import com.health.healthtel.dto.ResponseDto
import com.health.healthtel.entities.Phones
import com.health.healthtel.entities.Rooms
import com.health.healthtel.repository.PhoneRepository
import org.springframework.data.domain.Example
import org.springframework.data.domain.PageRequest
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@CrossOrigin
@RestController
class PhonesRest(private val phoneRepository: PhoneRepository){

    @GetMapping("phones")
    fun getAllPhones(@RequestParam(value = "id", required = false) id: Long,
                    @RequestParam(value = "clientId", required = false) clientId: Int,
                    @RequestParam(value = "phone", required = false) phone: String,
                    @RequestParam(value = "size", required = false, defaultValue = "10") size: Int,
                    @RequestParam(value = "page", required = false, defaultValue = "0") page: Int): ResponseDto<Phones> {
        val clientExample = Example.of(Phones(id = id,
                clientId = clientId,
                phone = phone
        ))
        val page = PageRequest.of(page, size)
        val result = phoneRepository.findAll(clientExample, page)
        return ResponseDto(result.content, 0)
    }

    @PostMapping("phones")
    fun addPhones(@RequestBody phones: Phones){
        phoneRepository.save(phones)
    }

    @DeleteMapping("phones/{id}")
    fun removePhones(@PathVariable("id") id: Long){
        phoneRepository.deleteById(id)
    }

    @PatchMapping("phones")
    fun updatePhones(@RequestBody phones: Phones): ResponseEntity<Phones> {
        if(phones.id != null) {
            if (phoneRepository.findById(phones.id).isPresent) {
                phoneRepository.save(phones)
                return ResponseEntity(HttpStatus.OK)
            } else {
                return ResponseEntity(HttpStatus.NOT_ACCEPTABLE)
            }
        } else {
            return ResponseEntity(HttpStatus.BAD_REQUEST)
        }
    }
}