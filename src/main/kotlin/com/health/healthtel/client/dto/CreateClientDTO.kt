package com.health.healthtel.client.dto

data class CreateClientDTO(
        val firstname: String,
        val lastname: String,
        val patronymic: String,
        val gender: Char,
        val email: String,
        val discount: String,
        val birthDay: Int,
        val birthMonth: Int,
        val birthyear: Int,
        val address: String,
        val doctor: Long
)