package com.example.coastmanagement.payload;

public class BeachSummary {
    private Long id;
    private String name;
    private float longitude;
    private float latitude;
    private String photoUri;
    private float todaysAvgTemperature;
    private float yesterdaysAvgTemperature;
    private float todaysAvgpH;
    private float yesterdaysAvgpH;

    public BeachSummary(Long id, String name, float longitude, float latitude, String photoUri) {
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.photoUri = photoUri;
    }

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
}
