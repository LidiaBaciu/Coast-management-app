package com.example.coastmanagement.payload.responses;

import com.example.coastmanagement.model.Beach;
import com.example.coastmanagement.model.Buoy;
import com.example.coastmanagement.model.User;
import com.example.coastmanagement.payload.BuoySummary;

import java.util.Set;

public class BeachResponse {
    private Long id;
    private String name;
    private float latitude;
    private float longitude;
    private String photoUri;
    private Set<BuoySummary> buoys;
    private float todaysAvgTemperature;
    private float yesterdaysAvgTemperature;
    private float todaysAvgpH;
    private float yesterdaysAvgpH;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getPhotoUri() {
        return photoUri;
    }

    public void setPhotoUri(String photoUri) {
        this.photoUri = photoUri;
    }

    public float getTodaysAvgTemperature() {
        return todaysAvgTemperature;
    }

    public void setTodaysAvgTemperature(float todaysAvgTemperature) {
        this.todaysAvgTemperature = todaysAvgTemperature;
    }

    public float getYesterdaysAvgTemperature() {
        return yesterdaysAvgTemperature;
    }

    public void setYesterdaysAvgTemperature(float yesterdaysAvgTemperature) {
        this.yesterdaysAvgTemperature = yesterdaysAvgTemperature;
    }

    public float getTodaysAvgpH() {
        return todaysAvgpH;
    }

    public void setTodaysAvgpH(float todaysAvgpH) {
        this.todaysAvgpH = todaysAvgpH;
    }

    public float getYesterdaysAvgpH() {
        return yesterdaysAvgpH;
    }

    public void setYesterdaysAvgpH(float yesterdaysAvgpH) {
        this.yesterdaysAvgpH = yesterdaysAvgpH;
    }

    public Set<BuoySummary> getBuoys() {
        return buoys;
    }

    public void setBuoys(Set<BuoySummary> buoys) {
        this.buoys = buoys;
    }
}
