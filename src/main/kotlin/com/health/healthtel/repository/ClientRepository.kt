package com.health.healthtel.repository

import com.health.healthtel.entities.ClientEntity
import org.springframework.data.jpa.repository.JpaRepository

interface ClientRepository : JpaRepository<ClientEntity, Long>
