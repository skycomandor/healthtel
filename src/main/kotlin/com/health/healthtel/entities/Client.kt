package com.health.healthtel.entities

import javax.persistence.*

@Entity(name = "clients")
data class Client(
        @Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
        val id: Long? = null,
        val firstname: String? = null,
        @Column(name = "secondname")
        val lastname: String? = null,
        @Column(name = "fathername")
        val patronymic: String? = null,
        val gender: Char? = null,
        val email: String? = null,
        val discount: String? = null,
        @Column(name = "birth_day")
        val birthDay: Int? = null,
        @Column(name = "birth_month")
        val birthMonth: Int? = null,
        @Column(name = "birth_year")
        val birthyear: Int? = null,
        @Column(nullable = true)
        val address: String? = null,
        @Column(name = "doctor_id")
        val doctorID: Int? = null
)