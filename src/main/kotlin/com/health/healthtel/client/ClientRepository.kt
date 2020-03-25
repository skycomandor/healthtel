package com.health.healthtel.client

import com.health.healthtel.client.ClientEntity
import org.springframework.data.jpa.repository.JpaRepository

interface ClientRepository : JpaRepository<ClientEntity, Long>
