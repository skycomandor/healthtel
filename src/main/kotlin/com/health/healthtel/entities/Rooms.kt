package com.health.healthtel.entities

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
data class Rooms(
        @Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
        val id: Int = 0,
        val name: String = "",
        val description: String = ""
)