package org.launchcode.OneThingApp.controllers;

import org.launchcode.OneThingApp.models.Entry;
import org.launchcode.OneThingApp.models.User;
import org.launchcode.OneThingApp.service.EntryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/entries")
public class EntryController {
	
	EntryService entryService;
	
	@PostMapping("")
	public ResponseEntity<Entry> createEntry(@AuthenticationPrincipal User user){
		
		//TO DO: get access to user information for user logged in
		entryService.save();
		
		
		return null;
		
	}

}
