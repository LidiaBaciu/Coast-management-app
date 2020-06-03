package com.example.coastmanagement.payload;

import com.example.coastmanagement.model.Buoy;

import java.util.List;

public class ProjectRequest {
    private String name;

    private String status;

    private String description;

    private List<Buoy> buoysIds;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Buoy> getBuoys() {
        return buoysIds;
    }

    public void setBuoys(List<Buoy> buoys) {
        this.buoysIds = buoys;
    }
}
