package org.launchcode.OneThingApp.controllers;

import org.launchcode.OneThingApp.service.AuthenticationService;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {
	
	//this controller will handle login and registration requests
	
	private final AuthenticationService authenticationService;

	public AuthenticationController(AuthenticationService authenticationService) {
		this.authenticationService = authenticationService;
	}
	
	

}
