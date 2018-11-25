package com.health.healthtel.entities

import javax.persistence.*

@Entity(name = "employees")
data class Employees(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long? = null,
        val firstname: String? = null,
        @Column(name = "secondname")
        val lastname: String? = null,
        @Column(name = "fathername")
        val patronymic: String? = null,
        val sex: String? = null,
        val profile: String? = null,
        val login: String? = null,
        @Column(name = "passwordHash", length = 100)
        val passwordHash: String? = null,
        val priority: Int? = null
)