package com.example.coastmanagement.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "sensors", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "id"
        })
})
public class Sensor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @OneToMany(mappedBy = "id",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            orphanRemoval = true)
    private Set<SensorValue> sensorValues;

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

    public Set<SensorValue> getSensorValues() {
        return sensorValues;
    }

    public void setSensorValues(Set<SensorValue> sensorValues) {
        this.sensorValues = sensorValues;
    }

    public Set<SensorValue> getSensorValuesFromBuoy(Long id){
        Set<SensorValue> sensorValueSet = new HashSet<>();
        for(SensorValue sensorValue : sensorValues){
            if(sensorValue.getBuoy() == id){
                sensorValueSet.add(sensorValue);
            }
        }
        return sensorValueSet;
    }
}
