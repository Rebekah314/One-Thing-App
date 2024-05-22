package org.launchcode.OneThingApp.service;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;


class EntryServiceTest {
	
	

	@Test
	void twoPlusTwoEqualsFour() {
		EntryService entryService = new EntryService();
		//asssertEquals(expectedValue, actualValue)
		assertEquals(4, entryService.simpleCalculator(2, 2));
	}
	
	//Tests should only test one thing
	//No need for public or private
	//not need to return anything
	//assertTrue and assertFalse
	//assertNull and assertNotNull
	//assertThrows

}
