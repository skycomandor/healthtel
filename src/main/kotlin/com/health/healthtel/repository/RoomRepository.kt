package com.health.healthtel.repository

import com.health.healthtel.entities.Rooms
import org.springframework.data.jpa.repository.JpaRepository

interface RoomRepository: JpaRepository<Rooms, Int>