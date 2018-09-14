package com.health.healthtel.rest

import com.health.healthtel.entities.Rooms
import com.health.healthtel.repository.RoomRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class RoomsRest(val roomRepository: RoomRepository){


    @GetMapping("rooms")
    fun getAllRooms(): List<Rooms> = roomRepository.findAll()

}