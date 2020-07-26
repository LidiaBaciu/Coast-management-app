package com.example.coastmanagement.service;

import com.example.coastmanagement.exception.ResourceNotFoundException;
import com.example.coastmanagement.model.Beach;
import com.example.coastmanagement.model.Buoy;
import com.example.coastmanagement.model.Sensor;
import com.example.coastmanagement.model.SensorValue;
import com.example.coastmanagement.payload.BeachSummary;
import com.example.coastmanagement.payload.BuoySummary;
import com.example.coastmanagement.payload.responses.BeachResponse;
import com.example.coastmanagement.payload.responses.BuoyResponse;
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

    public List<BeachResponse> getBeaches(){
        List<BeachResponse> beachResponseList = new ArrayList<>();
        for(Beach beach : beachRepository.findAll()){
            BeachResponse response = new BeachResponse();
            response.setId(beach.getId());
            response.setName(beach.getName());
            response.setLatitude(beach.getLatitude());
            response.setLongitude(beach.getLongitude());
            response.setBuoys(getBuoysSummariesFromBeach(beach.getId()));
            response.setPhotoUri(beach.getPhotoUri());
            if(getTodaysAvgStatistics(beach.getId()).containsKey("temperature")){
                response.setTodaysAvgTemperature(getTodaysAvgStatistics(beach.getId()).get("temperature"));
            }
            if(getTodaysAvgStatistics(beach.getId()).containsKey("ph")){
                response.setTodaysAvgpH(getTodaysAvgStatistics(beach.getId()).get("ph"));
            }
            if(getYesterdaysAvgStatistics(beach.getId()).containsKey("temperature")){
                response.setYesterdaysAvgTemperature(getYesterdaysAvgStatistics(beach.getId()).get("temperature"));
            }
            if(getYesterdaysAvgStatistics(beach.getId()).containsKey("ph")){
                response.setYesterdaysAvgpH(getYesterdaysAvgStatistics(beach.getId()).get("ph"));
            }
            beachResponseList.add(response);
        }
        return beachResponseList;
    }

    public BeachSummary getBeachSummary(Long id){
        Beach beach = beachRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Beach", "id", id));
        BeachSummary beachSummary = new BeachSummary(id, beach.getName(),
                beach.getLongitude(), beach.getLatitude(),
                beach.getPhotoUri());
        if(getTodaysAvgStatistics(beach.getId()).containsKey("temperature")){
            beachSummary.setTodaysAvgTemperature(getTodaysAvgStatistics(beach.getId()).get("temperature"));
        }
        if(getTodaysAvgStatistics(beach.getId()).containsKey("ph")){
            beachSummary.setTodaysAvgpH(getTodaysAvgStatistics(beach.getId()).get("ph"));
        }
        if(getYesterdaysAvgStatistics(beach.getId()).containsKey("temperature")){
            beachSummary.setYesterdaysAvgTemperature(getYesterdaysAvgStatistics(beach.getId()).get("temperature"));
        }
        if(getYesterdaysAvgStatistics(beach.getId()).containsKey("ph")){
            beachSummary.setYesterdaysAvgpH(getYesterdaysAvgStatistics(beach.getId()).get("ph"));
        }
        return beachSummary;
    }

    public List<BuoyResponse> getBuoysOnBeach(Long id){
        Beach beach = beachRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Beach", "id", id));
        Set<Buoy> buoys = beach.getBuoys();
        List<BuoyResponse> buoyResponses = new ArrayList<>();
        for (Buoy buoy: buoys) {
            BuoyResponse buoyResponse = new BuoyResponse();
            buoyResponse.setId(buoy.getId());
            buoyResponse.setLatitude(buoy.getLatitude());
            buoyResponse.setLongitude(buoy.getLongitude());
            buoyResponses.add(buoyResponse);
        }
        return buoyResponses;
    }

    public HashMap<String, Float> getTodaysAvgStatistics(long beachId){
        Beach beach = beachRepository.findById(beachId)
                .orElseThrow(() -> new ResourceNotFoundException("Beach", "id", beachId));
        Set<Buoy> buoys = beach.getBuoys();
        HashMap<String, Float> stats = new HashMap<>();
        for (Buoy buoy: buoys) {
            for(Sensor sensor : buoy.getSensorsBasedOnBuoy(buoy.getId())){
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
            for(Sensor sensor : buoy.getSensorsBasedOnBuoy(buoy.getId())){
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
            BuoySummary buoySummary = new BuoySummary(buoy.getId(), buoy.getLongitude(), buoy.getLatitude(), buoy.getSensorsBasedOnBuoy(buoy.getId()));
            buoySummarySet.add(buoySummary);
            buoySummary.setLatestTemperature(buoy.getLatestTemperatureForBuoy(buoy.getId()));
        }
       return buoySummarySet;
    }
}
