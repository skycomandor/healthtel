package com.health.healthtel.dto

class ResponseDto<T> (
        val list: List<T>? = null,
        val totalPages: Int? = null
)