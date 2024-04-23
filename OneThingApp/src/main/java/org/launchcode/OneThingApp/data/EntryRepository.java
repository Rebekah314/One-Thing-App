package org.launchcode.OneThingApp.data;

import java.util.Set;

import org.launchcode.OneThingApp.models.Entry;
import org.launchcode.OneThingApp.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EntryRepository extends JpaRepository<Entry, Long>{
	
	Set<Entry> findByUser(User user);

}
