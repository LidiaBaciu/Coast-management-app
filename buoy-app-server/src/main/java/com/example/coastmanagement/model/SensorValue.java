package com.example.coastmanagement.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "sensorvalue")
public class SensorValue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long entryId;

    @NotBlank
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "buoy_id", nullable = false)
    private Buoy buoy;

    @NotBlank
    private float value;

    @NotBlank
    private String timestamp;

    public SensorValue(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public float getValue() {
        return value;
    }

    public void setValue(float value) {
        this.value = value;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public Long getEntryId() {
        return entryId;
    }

    public void setEntryId(Long entryId) {
        this.entryId = entryId;
    }

    public Long getBuoy() {
        return buoy.getId();
    }

    public void setBuoy(Buoy buoy) {
        this.buoy = buoy;
    }

    @Override
    public String toString() {
        return "SensorValue{" +
                "entryId=" + entryId +
                ", id=" + id +
                ", value=" + value +
                ", timestamp='" + timestamp + '\'' +
                '}';
    }
}
