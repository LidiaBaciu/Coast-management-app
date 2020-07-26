package com.example.coastmanagement.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "buoys", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "id"
        })
})

public class Buoy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private float latitude;

    @NotNull
    private float longitude;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "buoy_sensors",
            joinColumns = @JoinColumn(name = "buoy_id"),
            inverseJoinColumns = @JoinColumn(name = "sensor_id"))
    private Set<Sensor> sensors = new HashSet<>();


    public Buoy(){}

    public Buoy(@NotNull float latitude, @NotNull float longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Set<Sensor> getSensors() {
        return sensors;
    }

    public Set<Sensor> getSensorsBasedOnBuoy(Long id){
        Set<Sensor> sensorSet = new HashSet<>();
        for(Sensor sensor: sensors){
            Sensor copySensor = new Sensor();
            copySensor.setId(sensor.getId());
            copySensor.setName(sensor.getName());
            copySensor.setSensorValues(sensor.getSensorValuesFromBuoy(id));
            sensorSet.add(copySensor);
        }
        return sensorSet;
    }
    public void setSensors(Set<Sensor> sensors) {
        this.sensors = sensors;
    }
}
