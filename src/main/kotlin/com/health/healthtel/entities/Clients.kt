package com.health.healthtel.entities

import java.util.*
import javax.persistence.*

@Entity
data class Clients(
        @Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
        val id: Long = 0,
        val firstname: String = "",
        val secondname: String = "",
        val fathername: String = "",
        val gender: Char = Character.MIN_VALUE,
        val email: String = "",
        val discount: String = "",
        @Column(name = "birth_day")
        val birthDay: Int = 0,
        @Column(name = "birth_month")
        val birthMonth: Int = 0,
        @Column(name = "birth_year")
        val birthyear: Int = 0,
        @Column(nullable = true)
        val address: String = "",
        @Column(name = "doctor_id")
        val doctorID: Int = 0
)