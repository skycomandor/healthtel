package com.health.healthtel.repository

import com.health.healthtel.entities.RoomEntity
import org.springframework.data.jpa.repository.JpaRepository

interface RoomRepository: JpaRepository<RoomEntity, Int>