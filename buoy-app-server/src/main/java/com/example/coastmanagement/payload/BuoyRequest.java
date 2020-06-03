package com.example.coastmanagement.payload;

public class BuoyRequest {
    private float latitude;
    private float longitude;

    private Long user_id;
    private Long beach_id;

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

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public Long getBeach_id() {
        return beach_id;
    }

    public void setBeach_id(Long beach_id) {
        this.beach_id = beach_id;
    }
}
