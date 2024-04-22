package org.launchcode.OneThingApp.service;

import org.launchcode.OneThingApp.models.Entry;
import org.launchcode.OneThingApp.models.Status;
import org.launchcode.OneThingApp.models.User;
import org.springframework.stereotype.Service;


@Service
public class EntryService {

	public void save(User user) {
		Entry entry = new Entry();
		

		//set default status to In_PROGRESS
		entry.setStatus(Status.IN_PROGRESS);
		
		//set author to user who is logged in
		entry.setAuthor(user);
		
		//TO DO create a repsository to store entries
		
	}

}
