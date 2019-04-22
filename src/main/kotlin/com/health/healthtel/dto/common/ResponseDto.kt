package com.health.healthtel.dto.common

class ResponseDto<T> (
        val list: List<T>? = null,
        val totalPages: Long? = null,
        val success: Boolean? = null
)