package com.health.healthtel.repository

import com.health.healthtel.entities.Clients
import org.springframework.data.jpa.repository.JpaRepository

interface ClientRepository : JpaRepository<Clients, Long>