package com.example.coastmanagement.payload.responses;

import java.time.Instant;


public class JwtAuthenticationResponse {
    private String accessToken;
    private String tokenType = "Bearer";

    private Long id;
    private String role;
    private String username;
    private String email;
    private String name;
    private Instant createdAt;
    private Instant updatedAt;

    public JwtAuthenticationResponse(String accessToken, Long id, String role, String username, String email, String name, Instant createdAt, Instant updatedAt) {
        this.accessToken = accessToken;
        this.id = id;
        this.role = role;
        this.username = username;
        this.email = email;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}
