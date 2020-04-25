package com.health.healthtel.client.dto

data class PhoneDTO(
        val number: String = "",
        val comment: String = "",
        val isMain: Boolean = false
)