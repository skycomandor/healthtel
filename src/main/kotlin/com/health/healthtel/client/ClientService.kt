package com.health.healthtel.client

import com.health.healthtel.client.dto.ClientInlineInfo
import com.health.healthtel.client.dto.CreateClientDTO
import com.health.healthtel.client.dto.createDto
import org.springframework.stereotype.Service
import com.health.healthtel.repository.EmployeeRepository
import com.health.healthtel.repository.PhoneRepository
import com.health.healthtel.repository.VisitRepository
import org.springframework.data.domain.Example
import org.springframework.data.domain.PageRequest
import org.springframework.transaction.annotation.Transactional

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

    @Transactional
    fun createNewClient(dto: CreateClientDTO): Long {
        val entity = ClientEntity(
                firstname = dto.firstname,
                lastname = dto.lastname,
                patronymic = dto.patronymic,
                gender = dto.gender,
                email = dto.email,
                discount = dto.discount,
                birthDay = dto.birthDay,
                birthMonth = dto.birthMonth,
                birthyear = dto.birthyear,
                address = dto.address,
                doctor = employeeRepository.findById(dto.doctor).get()
                )
        return clientRepository.save(entity).id!!
    }

}