package org.launchcode.OneThingApp.models;

public enum Status {
	
	COMPLETED("Completed"),
	PIVOTED("Pivoted"),
	IN_PROGRESS("In Progress");
	
	public final String label;

    private Status(String label) {
        this.label = label;
    }

}
