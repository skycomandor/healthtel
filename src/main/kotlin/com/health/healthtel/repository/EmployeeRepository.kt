package com.health.healthtel.repository

import com.health.healthtel.entities.Employees
import org.springframework.data.jpa.repository.JpaRepository

interface EmployeeRepository : JpaRepository<Employees, Long>