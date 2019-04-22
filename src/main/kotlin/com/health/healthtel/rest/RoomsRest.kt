package com.health.healthtel.rest

import com.health.healthtel.dto.common.MessageDto
import com.health.healthtel.dto.common.ResponseDto
import com.health.healthtel.entities.RoomEntity
import com.health.healthtel.repository.RoomRepository
import org.springframework.data.domain.Example
import org.springframework.data.domain.PageRequest
import org.springframework.web.bind.annotation.*

@CrossOrigin
@RestController
class RoomsRest(val roomRepository: RoomRepository){

    @GetMapping("rooms")
    fun getAllRooms(@RequestParam(value = "id", required = false) id: Int,
                       @RequestParam(value = "note", required = false) description: String?,
                       @RequestParam(value = "name", required = false) name: String?,
                       @RequestParam(value = "size", required = false, defaultValue = "10") size: Int,
                       @RequestParam(value = "page", required = false, defaultValue = "0") page: Int): ResponseDto<RoomEntity> {
        val clientExample = Example.of(RoomEntity(id = id,
                description = description,
                name = name
        ))
        val page = PageRequest.of(page, size)
        val result = roomRepository.findAll(clientExample, page)
        return ResponseDto(result.content, (roomRepository.count() / size) - 1, true)
    }

    @PostMapping("rooms")
    fun addRooms(@RequestBody roomEntity: RoomEntity): MessageDto {
        roomRepository.save(roomEntity)
        return MessageDto(true, "phone was created")
    }

    @DeleteMapping("rooms/{id}")
    fun removeRooms(@PathVariable("id") id: Int): MessageDto {
        roomRepository.deleteById(id)
        return MessageDto(true, "phone was deleted")
    }

    @PatchMapping("rooms")
    fun updateRooms(@RequestBody roomEntity: RoomEntity): MessageDto {
        if(roomEntity.id != null) {
            if (roomRepository.findById(roomEntity.id).isPresent) {
                roomRepository.save(roomEntity)
                return MessageDto(true, "phone was updated")
            } else {
                return MessageDto(false, "can not find phone by id " + roomEntity.id)
            }
        } else {
            return MessageDto(false, "error during update of phone")
        }
    }

}