package com.health.healthtel.entities

import javax.persistence.*

@Entity(name = "phones")
data class Phones(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long? = null,
        @Column(name = "client_id")
        val clientId: Long = 0,
        val phone: String = "",
        val main: Boolean? = null
)