package com.example.coastmanagement.payload;

import com.example.coastmanagement.model.Beach;
import com.example.coastmanagement.model.User;

public class BuoyResponse {
    private Long id;
    private float latitude;
    private float longitude;
    private User user;
    private Beach beach;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public float getLatitude() {
        return latitude;
    }

    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }

    public float getLongitude() {
        return longitude;
    }

    public void setLongitude(float longitude) {
        this.longitude = longitude;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Beach getBeach() {
        return beach;
    }

    public void setBeach(Beach beach) {
        this.beach = beach;
    }
}
