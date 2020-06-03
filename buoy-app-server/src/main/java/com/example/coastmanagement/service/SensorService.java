package com.example.coastmanagement.service;

import com.example.coastmanagement.model.Sensor;
import com.example.coastmanagement.repository.SensorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SensorService {

    @Autowired
    private SensorRepository sensorRepository;

    private static final Logger logger = LoggerFactory.getLogger(PollService.class);

    public List<Sensor> getAllSensors() {
        return sensorRepository.findAll();
    }
}
