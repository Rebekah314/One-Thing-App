package org.launchcode.OneThingApp.controllers;

import org.launchcode.OneThingApp.models.AuthenticationResponse;
import org.launchcode.OneThingApp.models.User;
import org.launchcode.OneThingApp.service.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {
	
	//this controller will handle login and registration requests
	
	private final AuthenticationService authenticationService;

	public AuthenticationController(AuthenticationService authenticationService) {
		this.authenticationService = authenticationService;
	}
	
	//right at 58:00 in video
	//https://www.youtube.com/watch?v=RnZmeczS_DI
	
	@PostMapping("/register")
	public ResponseEntity<AuthenticationResponse> register(
			@RequestBody User request
			) {
		return ResponseEntity.ok(authenticationService.register(request));
	}
	
	@PostMapping("/login")
	public ResponseEntity<AuthenticationResponse> login(
			@RequestBody User request
			) {
		return ResponseEntity.ok(authenticationService.authenticate(request));
	}
	
	//Need end point for front end to check if token is valid 
	@GetMapping("/validate")
	public ResponseEntity<AuthenticationResponse> validateJwtToken(@RequestParam String token) {
		return null;
		
	}
	

}
