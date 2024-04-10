package org.launchcode.OneThingApp.service;

import java.util.Optional;

import org.launchcode.OneThingApp.data.UserRepository;
import org.launchcode.OneThingApp.models.AuthenticationResponse;
import org.launchcode.OneThingApp.models.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMethod;

@Service
public class AuthenticationService {
	
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;
	

	
	public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService,
			AuthenticationManager authenticationManager) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtService = jwtService;
		this.authenticationManager = authenticationManager;
	}

	//create method for registration
	
	public AuthenticationResponse register(User request) {
		
		//test registration by sending JSON with email, userName, password, and role
		
		User user = new User();
		user.setEmail(request.getEmail());
		user.setUsername(request.getUsername());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		
		user.setRole(request.getRole());
		
		user = userRepository.save(user);
		
		String token = jwtService.generateToken(user);
		
		return new AuthenticationResponse(token);
	}
	
	//create method for login
	
	public AuthenticationResponse authenticate(User request) {
		
		//test login by sending JSON with userName and password
		//would I rather login be with email and password? 
		//if so, need TODO: add findByEmail method to UserRepository
		
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						//request.getUsername(), 
						request.getEmail(),
						request.getPassword())
				);
		
		//User user = userRepository.findByUsername(request.getUsername()).orElseThrow();
		User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
		
		String token = jwtService.generateToken(user);
		
		return new AuthenticationResponse(token);
		
	}

}
