package com.health.healthtel.entities

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity(name = "rooms")
data class Rooms(
        @Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
        val id: Int = 0,
        val name: String? = null,
        val description: String? = null
)