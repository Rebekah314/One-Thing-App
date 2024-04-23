package org.launchcode.OneThingApp.controllers;

import java.util.Set;

import org.launchcode.OneThingApp.models.Entry;
import org.launchcode.OneThingApp.models.User;
import org.launchcode.OneThingApp.service.EntryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/entries")
public class EntryController {
	
	private final EntryService entryService;
	
	public EntryController(EntryService entryService) {
		this.entryService = entryService;
	}



	@PostMapping("")
	public ResponseEntity<?> createEntry(@AuthenticationPrincipal User user){
		
		Entry newEntry = entryService.save(user);
		
		
		return ResponseEntity.ok(newEntry);
		
	}
	
	@GetMapping("")
	public ResponseEntity<?> getEntries(@AuthenticationPrincipal User user){
		Set<Entry> entriesByUser = entryService.findByAuthor(user);
		return ResponseEntity.ok(entriesByUser);
	}
	

}
