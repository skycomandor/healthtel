package com.health.healthtel.rest

import com.health.healthtel.dto.MessageDto
import com.health.healthtel.dto.ResponseDto
import com.health.healthtel.entities.Rooms
import com.health.healthtel.repository.RoomRepository
import org.springframework.data.domain.Example
import org.springframework.data.domain.PageRequest
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@CrossOrigin
@RestController
class RoomsRest(val roomRepository: RoomRepository){

    @GetMapping("rooms")
    fun getAllRooms(@RequestParam(value = "id", required = false) id: Int,
                       @RequestParam(value = "description", required = false) description: String?,
                       @RequestParam(value = "name", required = false) name: String?,
                       @RequestParam(value = "size", required = false, defaultValue = "10") size: Int,
                       @RequestParam(value = "page", required = false, defaultValue = "0") page: Int): ResponseDto<Rooms> {
        val clientExample = Example.of(Rooms(id = id,
                description = description,
                name = name
        ))
        val page = PageRequest.of(page, size)
        val result = roomRepository.findAll(clientExample, page)
        return ResponseDto(result.content, 0, true)
    }

    @PostMapping("rooms")
    fun addRooms(@RequestBody rooms: Rooms): MessageDto{
        roomRepository.save(rooms)
        return MessageDto(true, "phone was created")
    }

    @DeleteMapping("rooms/{id}")
    fun removeRooms(@PathVariable("id") id: Int): MessageDto {
        roomRepository.deleteById(id)
        return MessageDto(true, "phone was deleted")
    }

    @PatchMapping("rooms")
    fun updateRooms(@RequestBody rooms: Rooms): MessageDto {
        if(rooms.id != null) {
            if (roomRepository.findById(rooms.id).isPresent) {
                roomRepository.save(rooms)
                return MessageDto(true, "phone was updated")
            } else {
                return MessageDto(false, "can not find phone by id " + rooms.id)
            }
        } else {
            return MessageDto(false, "error during update of phone")
        }
    }

}