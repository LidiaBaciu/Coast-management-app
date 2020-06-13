package com.example.coastmanagement.payload.responses;

import com.example.coastmanagement.payload.BuoySummary;
import com.example.coastmanagement.payload.UserSummary;

public class ProblemResponse {
    private Long id;
    private String username;
    private Long buoyId;
    private String description;
    private String timestamp;
    private Boolean isSolved;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getBuoyId() {
        return buoyId;
    }

    public void setBuoyId(Long buoyId) {
        this.buoyId = buoyId;
    }
}
