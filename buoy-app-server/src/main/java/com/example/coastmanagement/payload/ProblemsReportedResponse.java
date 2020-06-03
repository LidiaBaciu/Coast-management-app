package com.example.coastmanagement.payload;

public class ProblemsReportedResponse {
    private Long id;
    private UserSummary userSummary;
    private BuoySummary buoySummary;
    private String description;
    private String timestamp;
    private Boolean isSolved;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserSummary getUserSummary() {
        return userSummary;
    }

    public void setUserSummary(UserSummary userSummary) {
        this.userSummary = userSummary;
    }

    public BuoySummary getBuoySummary() {
        return buoySummary;
    }

    public void setBuoySummary(BuoySummary buoySummary) {
        this.buoySummary = buoySummary;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public Boolean getSolved() {
        return isSolved;
    }

    public void setSolved(Boolean solved) {
        isSolved = solved;
    }
}
