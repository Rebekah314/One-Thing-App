package org.launchcode.OneThingApp.data;

import org.launchcode.OneThingApp.models.Entry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EntryRepository extends JpaRepository<Entry, Integer>{

}
