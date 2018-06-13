package com.health.healthtel.rest

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class UserRest {

    @GetMapping("user")
    fun getUser(): User = User("Hello")

}

data class User(val name: String)