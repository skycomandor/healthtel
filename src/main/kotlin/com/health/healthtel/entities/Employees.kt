package com.health.healthtel.entities

import javax.persistence.*

@Entity
data class Employees(
       @Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
       val id: Long = 0,
       val firstname: String = "",
       val secondname: String = "",
       val fathername: String? = null,
       val sex: String = "",
       val profile: String = "",
       val login: String = "",
       @Column(name = "passwordHash", length = 100)
       val passwordHash: String = "",
       val priority: Int = 0
)