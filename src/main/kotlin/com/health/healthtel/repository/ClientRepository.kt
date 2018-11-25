package com.health.healthtel.repository

import com.health.healthtel.entities.Client
import org.springframework.data.domain.Page
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.query.Param
import java.awt.print.Pageable

interface ClientRepository : JpaRepository<Client, Long>
