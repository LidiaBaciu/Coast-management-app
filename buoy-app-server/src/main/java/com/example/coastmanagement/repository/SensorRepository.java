package com.example.coastmanagement.repository;

import com.example.coastmanagement.model.Sensor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SensorRepository extends JpaRepository<Sensor, Long> {
    Optional<Sensor> findById(Long sensorId);
}
