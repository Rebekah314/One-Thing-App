package org.launchcode.OneThingApp.models;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Entry {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	
	private LocalDate date;
	
	private String content;
	
	@Enumerated(value = EnumType.STRING)
    private Status status;
	
	//TODO link to author
	//TODO link to accountability partner "friend"
	
	//TODO tag with another enum: personal, family, home, financial, car, errand, other 

}
