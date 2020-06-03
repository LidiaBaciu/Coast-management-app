package com.example.coastmanagement.payload;

import com.example.coastmanagement.model.Buoy;
import com.example.coastmanagement.model.User;

public class ProblemRequest {

    private User user;
    private Buoy buoy;
    private String description;
    private String timestamp;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Buoy getBuoy() {
        return buoy;
    }

    public void setBuoy(Buoy buoy) {
        this.buoy = buoy;
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
}
