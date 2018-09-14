package com.health.healthtel.entities

import javax.persistence.*

@Entity
data class Phones(
        @Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
        val id: Long = 0,
        @Column(name = "client_id")
        val clientId: Int = 0,
        val phone: String = ""
)