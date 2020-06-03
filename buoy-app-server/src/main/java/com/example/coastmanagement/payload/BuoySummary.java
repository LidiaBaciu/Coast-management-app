package com.example.coastmanagement.payload;

import com.example.coastmanagement.model.Sensor;

import java.util.Set;

public class BuoySummary {
    private Long id;
    private float longitude;
    private float latitude;
    private Set<Sensor> sensors;

    public BuoySummary(){}

    public BuoySummary(Long id, float longitude, float latitude, Set<Sensor> sensors) {
        this.id = id;
        this.longitude = longitude;
        this.latitude = latitude;
        this.sensors = sensors;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public float getLongitude() {
        return longitude;
    }

    public void setLongitude(float longitude) {
        this.longitude = longitude;
    }

    public float getLatitude() {
        return latitude;
    }

    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }

    public Set<Sensor> getSensors() {
        return sensors;
    }

    public void setSensors(Set<Sensor> sensors) {
        this.sensors = sensors;
    }
}
