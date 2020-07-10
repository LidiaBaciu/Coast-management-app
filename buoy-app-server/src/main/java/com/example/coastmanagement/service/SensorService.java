package com.example.coastmanagement.service;

import com.example.coastmanagement.model.Sensor;
import com.example.coastmanagement.model.SensorValue;
import com.example.coastmanagement.repository.SensorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class SensorService {

    @Autowired
    private SensorRepository sensorRepository;

    public List<Sensor> getAllSensors() {
        return sensorRepository.findAll();
    }

    public List<SensorValue> getTodaysSensors(){
        List<SensorValue> todaysSensors = new ArrayList<>();
        for(Sensor sensor: sensorRepository.findAll()){
            for(SensorValue sensorValue : sensor.getSensorValues()){
                String sensorDate = sensorValue.getTimestamp();
                String dateNow = LocalDate.now().toString();
                System.out.println("sensorDate: " + sensorDate);
                System.out.println("dateNow: " + dateNow);
                if(sensorDate.contains(dateNow)){
                    todaysSensors.add(sensorValue);
                }
            }
        }
        return todaysSensors;
    }

    public List<SensorValue> getThisMonthsSensors(boolean all, boolean temperature){
        String type = (temperature) ? "temperature" : "ph";
        List<SensorValue> thisMonthsSensors = new ArrayList<>();
        for(Sensor sensor: sensorRepository.findAll()){
            if(all || sensor.getName().equalsIgnoreCase(type)){
                for(SensorValue sensorValue : sensor.getSensorValues()){
                    String sensorDate = sensorValue.getTimestamp();
                    String sensorMonth =  sensorDate.split(" ")[1];
                    String dateNow = LocalDate.now().toString();
                    String thisMonth = dateNow.split(" ")[1];
                    if(sensorMonth.equalsIgnoreCase(thisMonth)){
                        thisMonthsSensors.add(sensorValue);
                    }
                }
            }
        }
        return thisMonthsSensors;
    }

    public List<SensorValue> getThisYearsSensors(boolean all, boolean temperature){
        String type = (temperature) ? "temperature" : "ph";
        List<SensorValue> thisYearsSensors = new ArrayList<>();
        for(Sensor sensor: sensorRepository.findAll()){
            if(all || sensor.getName().equalsIgnoreCase(type)) {
                for (SensorValue sensorValue : sensor.getSensorValues()) {
                    String sensorDate = sensorValue.getTimestamp();
                    String sensorYear = sensorDate.split(" ")[0];
                    String dateNow = LocalDate.now().toString();
                    String thisYear = dateNow.split(" ")[0];
                    if (sensorYear.equalsIgnoreCase(thisYear)) {
                        thisYearsSensors.add(sensorValue);
                    }
                }
            }
        }
        return thisYearsSensors;
    }
}
