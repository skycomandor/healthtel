package com.health.healthtel.entities

import java.util.*
import javax.persistence.*

@Entity(name = "visit")
data class VisitEntity (
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long? = null,
        val clientId: Long? = null,
        val doctorId: Long? = null,
        val roomId: Long? = null,
        val startDate: Date? = null,
        val endDate: Date? = null,
        val note: String? = null
)