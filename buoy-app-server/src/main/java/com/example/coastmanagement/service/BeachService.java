package com.example.coastmanagement.service;

import com.example.coastmanagement.exception.ResourceNotFoundException;
import com.example.coastmanagement.model.Beach;
import com.example.coastmanagement.model.Buoy;
import com.example.coastmanagement.model.Sensor;
import com.example.coastmanagement.model.SensorValue;
import com.example.coastmanagement.payload.BuoySummary;
import com.example.coastmanagement.repository.BeachRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class BeachService {

    @Autowired
    private BeachRepository beachRepository;

    public List<Beach> getAllBeaches(){
        return beachRepository.findAll();
    }

    public HashMap<String, Float> getTodaysAvgStatistics(long beachId){
        Beach beach = beachRepository.findById(beachId)
                .orElseThrow(() -> new ResourceNotFoundException("Beach", "id", beachId));
        Set<Buoy> buoys = beach.getBuoys();
        HashMap<String, Float> stats = new HashMap<>();
        for (Buoy buoy: buoys) {
            for(Sensor sensor : buoy.getSensors()){
                for(SensorValue sensorValue : sensor.getSensorValues()){
                    String sensorDate = sensorValue.getTimestamp();
                    String dateNow = LocalDate.now().toString();
                    System.out.println("sensorDate: " + sensorDate);
                    System.out.println("dateNow: " + dateNow);
                    if(sensorDate.contains(dateNow)){
                        if(stats.containsKey(sensor.getName())){
                            stats.put(sensor.getName(), (stats.get(sensor.getName()) + sensorValue.getValue())/2);
                        }else{
                            stats.put(sensor.getName(), sensorValue.getValue());
                        }
                    }
                }
            }
        }
        return stats;
    }

    public HashMap<String, Float> getYesterdaysAvgStatistics(long beachId){
        Beach beach = beachRepository.findById(beachId)
                .orElseThrow(() -> new ResourceNotFoundException("Beach", "id", beachId));
        Set<Buoy> buoys = beach.getBuoys();
        HashMap<String, Float> stats = new HashMap<>();
        for (Buoy buoy: buoys) {
            for(Sensor sensor : buoy.getSensors()){
                for(SensorValue sensorValue : sensor.getSensorValues()){
                    String sensorDate = sensorValue.getTimestamp()
                            .substring(0, sensorValue.getTimestamp()
                                    .indexOf(" "));
                    String[] sensorDateParts = sensorDate.split("-");
                    String dateNow = LocalDate.now().toString();
                    String[] actualDateParts = dateNow.split("-");

                    if(sensorDateParts[0].equals(actualDateParts[0])
                            && sensorDateParts[1].equals(actualDateParts[1])
                            && Integer.parseInt(sensorDateParts[2]) ==
                            (Integer.parseInt(actualDateParts[2]) - 1)){
                        if(stats.containsKey(sensor.getName())){
                            stats.put(sensor.getName(), (stats.get(sensor.getName()) + sensorValue.getValue())/2);
                        }else{
                            stats.put(sensor.getName(), sensorValue.getValue());
                        }
                    }
                }
            }
        }
        return stats;
    }

    public Set<BuoySummary> getBuoysSummariesFromBeach(long beachId){
        Beach beach = beachRepository.findById(beachId)
                .orElseThrow(() -> new ResourceNotFoundException("Beach", "id", beachId));
        Set<Buoy> buoys = beach.getBuoys();
        Set<BuoySummary> buoySummarySet = new HashSet<>();

        for (Buoy buoy: buoys) {
            Set<Sensor> buoySensors = new HashSet<>();

            BuoySummary buoySummary = new BuoySummary(buoy.getId(), buoy.getLongitude(), buoy.getLatitude(), buoy.getSensorsBasedOnBuoy(buoy.getId()));
            buoySummarySet.add(buoySummary);
        }
       return buoySummarySet;
    }
}
