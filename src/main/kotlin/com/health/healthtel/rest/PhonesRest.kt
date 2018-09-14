package com.health.healthtel.rest

import com.health.healthtel.entities.Phones
import com.health.healthtel.repository.PhoneRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class PhonesRest(private val phoneRepository: PhoneRepository){

    @GetMapping("phones")
    fun getAllPhones(): List<Phones> = phoneRepository.findAll()
}