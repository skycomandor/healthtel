package com.health.healthtel.rest

import com.health.healthtel.entities.Clients
import com.health.healthtel.entities.Employees
import com.health.healthtel.repository.ClientRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class ClientRest(private val clientRepo: ClientRepository){

    @GetMapping("clients")
    fun getAllEmploees(): List<Clients> = clientRepo.findAll()

}