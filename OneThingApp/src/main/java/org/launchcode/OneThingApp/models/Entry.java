package org.launchcode.OneThingApp.models;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Entry {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	private LocalDate date;
	
	private String content;
	
	@Enumerated(value = EnumType.STRING)
    private Status status;
	
	@ManyToOne(optional=false)
	@JoinColumn(name = "user_id")
	private User author;
	
	private User accountabilityFriend;
	
	//TODO tag with another enum: personal, family, home, financial, car, errand, other 
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public User getAuthor() {
		return author;
	}

	public void setAuthor(User author) {
		this.author = author;
	}

	public User getAccountabilityFriend() {
		return accountabilityFriend;
	}

	public void setAccountabilityFriend(User accountabilityFriend) {
		this.accountabilityFriend = accountabilityFriend;
	}

	

}
