package com.health.healthtel.client.dto

import com.health.healthtel.client.ClientEntity
import com.health.healthtel.entities.*
import java.util.*

data class ClientInlineInfo(
        val firstname: String? = null,
        val lastname: String? = null,
        val patronymic: String? = null,
        val mainPhoneNumber: String? = null,
        val discountNumber: String? = null,
        val lastVisitDate: Date? = null,
        val doctorsName: String? = null,
        val doctorsLastName: String? = null,
        val doctorsPatronomicName: String? = null
        ) {


}

fun createDto(clientEntity: ClientEntity, phones: Phones?,
              visit: VisitEntity?,
              doctor: Employees?): ClientInlineInfo {

    val clientInlineInfo = ClientInlineInfo(
            clientEntity.firstname,
            clientEntity.lastname,
            clientEntity.patronymic,
            phones?.phone,
            clientEntity.discount,
            visit?.startDate,
            doctor?.firstname,
            doctor?.lastname,
            doctor?.patronymic
    )
    return clientInlineInfo
}