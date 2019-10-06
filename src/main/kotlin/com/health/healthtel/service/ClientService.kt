package com.health.healthtel.service

import com.health.healthtel.dto.common.clients.ClientInlineInfo
import com.health.healthtel.dto.common.clients.createDto
import com.health.healthtel.entities.ClientEntity
import org.springframework.stereotype.Service
import com.health.healthtel.repository.ClientRepository
import com.health.healthtel.repository.EmployeeRepository
import com.health.healthtel.repository.PhoneRepository
import com.health.healthtel.repository.VisitRepository
import org.springframework.data.domain.Example
import org.springframework.data.domain.PageRequest
import org.springframework.transaction.annotation.Transactional
import java.sql.ClientInfoStatus

@Service
@Transactional
class ClientService(private val clientRepository: ClientRepository,
                    private val visitRepository: VisitRepository,
                    private val phoneRepository: PhoneRepository,
                    private val employeeRepository: EmployeeRepository) {


    fun getClientInfo(id: Long?,
                      firstname: String?,
                      lastname: String?,
                      patronymic: String?,
                      email: String?,
                      size: Int,
                      page: Int): List<ClientInlineInfo> {

        val clientExample = Example.of(ClientEntity(id = id,
                firstname = firstname,
                lastname = lastname,
                patronymic = patronymic,
                email = email))

        val page = PageRequest.of(page - 1, size)
        val clientEntities = clientRepository.findAll(clientExample, page)
        return clientEntities.content.map { t ->
            var visit = visitRepository.findFirstByClientIdOrderByStartDate(t.id!!)
            val doctor = if(visit != null) employeeRepository.findById(visit.doctorId!!) else null
            createDto(t,
                    phoneRepository.findByClientIdAndMainTrue(t.id!!),
                    visit,
                    doctor?.orElseGet(null)
            )

        }
    }

}