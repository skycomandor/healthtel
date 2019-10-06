package com.health.healthtel.repository

import com.health.healthtel.entities.VisitEntity
import org.springframework.data.jpa.repository.JpaRepository

interface VisitRepository: JpaRepository<VisitEntity, Long> {

    fun findFirstByClientIdOrderByStartDate(clientId: Long): VisitEntity?

}