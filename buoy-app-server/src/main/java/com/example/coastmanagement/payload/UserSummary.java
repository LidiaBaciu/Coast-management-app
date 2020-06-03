package com.example.coastmanagement.payload;

import com.example.coastmanagement.model.RoleName;

public class UserSummary {
    private Long id;
    private String username;
    private String name;
    private RoleName roleName;

    public UserSummary(){}

    public UserSummary(Long id, String username, String name, RoleName roleName) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.roleName = roleName;
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

    public RoleName getRoleName() {
        return roleName;
    }

    public void setRoleName(RoleName roleName) {
        this.roleName = roleName;
    }
}
