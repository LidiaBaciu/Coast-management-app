package com.example.coastmanagement.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projects", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "id"
        })
})
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 40)
    private String name;

    @NotBlank
    private String status;

    @NotBlank
    private String description;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "project_buoys",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "buoy_id"))
    private List<Buoy> buoys = new ArrayList<>();

    public Project(){}

    public Project(@NotBlank @Size(max = 40) String name, @NotBlank String status, @NotBlank String description) {
        this.name = name;
        this.status = status;
        this.description = description;
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
        return buoys;
    }

    public void setBuoys(List<Buoy> buoys) {
        this.buoys = buoys;
    }
}
