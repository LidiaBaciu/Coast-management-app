package com.example.coastmanagement.controller;

import com.example.coastmanagement.model.Sensor;
import com.example.coastmanagement.repository.SensorRepository;
import com.example.coastmanagement.service.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SensorController {

    @Autowired
    private SensorRepository sensorRepository;

    @Autowired
    private SensorService sensorService;

    @GetMapping("/sensors")
    public List<Sensor> getSensors() {
        return sensorService.getAllSensors();
    }
}
