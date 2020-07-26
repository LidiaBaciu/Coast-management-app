package com.example.coastmanagement.payload;

import com.example.coastmanagement.model.Buoy;
import com.example.coastmanagement.model.RoleName;

import java.time.Instant;
import java.util.List;

public class UserProfile {
    private Long id;
    private String username;
    private String name;
    private Instant joinedAt;
    private RoleName role;
    private List<Buoy> buoys;

    public UserProfile(Long id, String username, String name, Instant joinedAt,
                       RoleName role, List<Buoy> buoys) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.joinedAt = joinedAt;
        this.role = role;
        this.buoys = buoys;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getJoinedAt() {
        return joinedAt;
    }

    public void setJoinedAt(Instant joinedAt) {
        this.joinedAt = joinedAt;
    }

    public RoleName getRole() { return role; }

    public void setRole(RoleName role) { this.role = role; }

    public List<Buoy> getBuoys() {
        return buoys;
    }

    public void setBuoys(List<Buoy> buoys) {
        this.buoys = buoys;
    }
}
