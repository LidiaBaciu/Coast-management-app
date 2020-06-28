package com.example.coastmanagement.controller;


import com.example.coastmanagement.exception.ResourceNotFoundException;
import com.example.coastmanagement.model.*;
import com.example.coastmanagement.payload.requests.FishRequest;
import com.example.coastmanagement.payload.responses.ProblemResponse;
import com.example.coastmanagement.repository.BeachRepository;
import com.example.coastmanagement.repository.FishRepository;
import com.example.coastmanagement.service.BeachService;
import com.example.coastmanagement.service.FishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class FishController {

    @Autowired
    private FishRepository fishRepository;

    @Autowired
    private FishService fishService;

    @Autowired
    private BeachRepository beachRepository;

    @Autowired
    private BeachService beachService;

    @GetMapping("/fishes/{id}")
    public Fish getFish(@PathVariable(value = "id") Long id) {
        Fish fish = fishRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Fish", "id", id));
        return fish;
    }

    @GetMapping("/fishes")
    public List<Fish> getAllFish() {
        return fishService.getAllFish();
    }

    @PostMapping("/fish/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addFish(@RequestBody FishRequest fishRequest){
        save(fishRequest);
        return ResponseEntity.ok("Fish has been created successfully!");
    }

    public Fish save(FishRequest fishRequest){
        Fish fish = new Fish();
        fish.setName(fishRequest.getName());
        fish.setMinTemperature(fishRequest.getMinTemperature());
        fish.setMaxTemperature(fishRequest.getMaxTemperature());
        fish.setPhotoUri(fishRequest.getPhotoUri());
        return fishRepository.save(fish);
    }

    @GetMapping("fishes/atBeach/{idBeach}")
    public List<Fish> getFishesAtBeach(@PathVariable(value = "idBeach") Long id) {
        List<Fish> availableFishes = new ArrayList<>();
        Beach beach = beachRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Beach", "id", id));
        Set<Buoy> buoys = beach.getBuoys();
        float latestValue = 0;
        boolean foundValue = false;
        for (Buoy buoy: buoys) {
            for(Sensor sensor : buoy.getSensors()){
                if(sensor.getName().equals("temperature")) {
                    List<SensorValue> sortedValues = sensor.getSensorValues().stream()
                            .sorted(Comparator.comparing(SensorValue::getTimestamp).reversed())
                            .collect(Collectors.toList());
                    String dateNow = LocalDate.now().toString();
                    if(sortedValues.get(0).getTimestamp().contains(dateNow)){
                        latestValue = sortedValues.get(0).getValue();
                        foundValue = true;
                        break;
                    }
                }
            }
            if(foundValue){
                break;
            }
        }
        System.out.println("latestValue = " + latestValue);
        for(Fish fish : fishService.getAllFish()){
            System.out.println(fish.getMinTemperature() + " " + fish.getMaxTemperature());
            if(fish.getMinTemperature() < latestValue
                    && fish.getMaxTemperature() > latestValue){
                availableFishes.add(fish);
            }
        }
        return availableFishes;
    }
}
