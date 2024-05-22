package org.launchcode.OneThingApp.service;

import java.time.LocalDate;
import java.util.Optional;
import java.util.Set;

import org.launchcode.OneThingApp.data.EntryRepository;
import org.launchcode.OneThingApp.models.Entry;
import org.launchcode.OneThingApp.models.Status;
import org.launchcode.OneThingApp.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EntryService {
	
	@Autowired
	private EntryRepository entryRepository;

	//pass in just a user to create a new entry
	public Entry save(User user) {
		Entry entry = new Entry();
		

		//set default status to In_PROGRESS
		entry.setStatus(Status.IN_PROGRESS);
		
		//set author to user who is logged in
		entry.setAuthor(user);
		
		//initialize content with empty string
		entry.setContent("");
		
		//initialize date with current date
		entry.setDate(LocalDate.now());
		
		//store entry in repository, and return entry
		return entryRepository.save(entry);
		
	}
	
	public Set<Entry> findByAuthor (User user){
		return entryRepository.findByAuthor(user);
		//we don't want to wire the repository into the controller
		//repositories should be wired into services, and then services get wired into controllers
	}

	public Optional<Entry> findById(long entryId) {
		return entryRepository.findById(entryId);

	}

	//pass in an entry to update the fields of that entry
	public Entry save(Entry entry) {
		return entryRepository.save(entry);
		
	}
	
	//adding this method to practice writing tests
	public Float simpleCalculator(Float a, Float b) {
		return a + b;
	}

}
