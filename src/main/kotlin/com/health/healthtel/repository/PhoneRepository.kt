package com.health.healthtel.repository

import com.health.healthtel.entities.Phones
import org.springframework.data.jpa.repository.JpaRepository

interface PhoneRepository : JpaRepository<Phones, Long> {
    fun findByClientIdAndMainTrue(id: Long): Phones?
}