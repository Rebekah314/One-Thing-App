package org.launchcode.OneThingApp.controllers;

import java.util.Optional;
import java.util.Set;

import org.launchcode.OneThingApp.models.Entry;
import org.launchcode.OneThingApp.models.User;
import org.launchcode.OneThingApp.service.EntryService;
//import org.springframework.data.web.JsonPath;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@GetMapping("{entryId}")
	public ResponseEntity<?> getEntryById(@PathVariable long entryId, @AuthenticationPrincipal User user) {
		Optional<Entry> entryOptional = entryService.findById(entryId);
		return ResponseEntity.ok(entryOptional.orElse(new Entry()));
	}
	
	@PostMapping("{entryId}")
	public ResponseEntity<?> updateEntryById(@PathVariable long entryId, 
			@RequestBody Entry entry,
			@AuthenticationPrincipal User user) {
		//Entry updatedEntry = JSON.parse(jsonStringifiedEntry);
		Entry updatedEntry = entryService.save(entry);
		return ResponseEntity.ok(updatedEntry);
	}
	
	@DeleteMapping("{entryId}")
	public ResponseEntity<?> deleteEntryById(@PathVariable long entryId, @AuthenticationPrincipal User user){
		Optional<Entry> entryOptional = entryService.deleteById(entryId);
		return ResponseEntity.ok(entryOptional.orElse(new Entry()));
	}
}
