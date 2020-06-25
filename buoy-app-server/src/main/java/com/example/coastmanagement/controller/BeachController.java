package com.example.coastmanagement.controller;

import com.example.coastmanagement.exception.ResourceNotFoundException;
import com.example.coastmanagement.model.Beach;
import com.example.coastmanagement.model.Buoy;
import com.example.coastmanagement.model.Sensor;
import com.example.coastmanagement.model.SensorValue;
import com.example.coastmanagement.payload.requests.BeachRequest;
import com.example.coastmanagement.payload.BeachSummary;
import com.example.coastmanagement.payload.responses.BuoyResponse;
import com.example.coastmanagement.repository.BeachRepository;
import com.example.coastmanagement.service.BeachService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api")
public class BeachController {
    @Autowired
    private BeachRepository beachRepository;

    @Autowired
    private BeachService beachService;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/beaches/{id}")
    public BeachSummary getBeach(@PathVariable(value = "id") Long id) {
        Beach beach = beachRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Beach", "id", id));
        BeachSummary beachSummary = new BeachSummary(id, beach.getName(),
                                                beach.getLongitude(), beach.getLatitude(),
                                                beach.getPhotoUri());
        return beachSummary;
    }

    @GetMapping("/beaches")
    public List<Beach> getBeaches() {
        return beachService.getAllBeaches();
    }

    @GetMapping("/beach/{id}/buoys")
    public List<BuoyResponse> getBuoysFromBeach(@PathVariable(value = "id") Long id){
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

    @PostMapping("/beach/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addBeach(@RequestBody BeachRequest beachRequest){
        save(beachRequest);
        return ResponseEntity.ok("Beach has been created successfully!");
    }

    public Beach save(BeachRequest beachRequest){
        Beach beach = new Beach();
        beach.setName(beachRequest.getName());
        beach.setLatitude(beachRequest.getLatitude());
        beach.setLongitude(beachRequest.getLongitude());
        beach.setPhotoUri(beachRequest.getPhotoUri());
        return beachRepository.save(beach);
    }
    /*
        Get the stats for today
     */
    @GetMapping("/beach/{id}/stats/today")
    public HashMap<String, Float> getStatsForBeach(@PathVariable(value = "id") Long id){
        Beach beach = beachRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Beach", "id", id));
        Set<Buoy> buoys = beach.getBuoys();
        HashMap<String, Float> stats = new HashMap<>();
        //List<Float> stats = new ArrayList<>();
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

    @GetMapping("/beach/{id}/stats/yesterday")
    public HashMap<String, Float> getStatsForBeachYesterday(@PathVariable(value = "id") Long id){
        Beach beach = beachRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Beach", "id", id));
        Set<Buoy> buoys = beach.getBuoys();
        HashMap<String, Float> stats = new HashMap<>();
        //List<Float> stats = new ArrayList<>();
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
}
