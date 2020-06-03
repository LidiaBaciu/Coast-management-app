package com.example.coastmanagement.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "problemsreported", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "id"
        })
})
public class ProblemsReported {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "buoy_id", nullable = false)
    private Buoy buoy;

    @NotBlank
    private String description;

    private String timestamp;

    private Boolean isSolved;

    public ProblemsReported(){}

    public ProblemsReported(@NotBlank String description, String timestamp) {
        this.description = description;
        this.timestamp = timestamp;
        this.isSolved = false;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public Boolean getSolved() {
        return isSolved;
    }

    public void setSolved(Boolean solved) {
        isSolved = solved;
    }
}
