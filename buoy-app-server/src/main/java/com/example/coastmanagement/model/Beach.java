package com.example.coastmanagement.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

@Entity
@Table(name = "beaches", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "id"
        }),
        @UniqueConstraint(columnNames = {
                "name"
        })
})
public class Beach {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 40)
    private String name;

    @NotNull
    private float latitude;

    @NotNull
    private float longitude;

    private String photoUri;

    @OneToMany(cascade = CascadeType.ALL,
            orphanRemoval = true)
    @JoinColumn(name = "beach_id")
    private Set<Buoy> buoys;

    public Beach(){}

    public Beach(@NotBlank @Size(max = 40) String name, @NotBlank float latitude, @NotBlank float longitude,
                            String photoUri) {
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

    public Set<Buoy> getBuoys() {
        return buoys;
    }

    public void setBuoys(Set<Buoy> buoys) {
        this.buoys = buoys;
    }
}
