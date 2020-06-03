package com.example.coastmanagement.controller;


import com.example.coastmanagement.exception.ResourceNotFoundException;
import com.example.coastmanagement.model.Beach;
import com.example.coastmanagement.model.Buoy;
import com.example.coastmanagement.model.Fish;
import com.example.coastmanagement.model.User;
import com.example.coastmanagement.payload.BuoyRequest;
import com.example.coastmanagement.payload.FishRequest;
import com.example.coastmanagement.repository.FishRepository;
import com.example.coastmanagement.service.FishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class FishController {

    @Autowired
    private FishRepository fishRepository;

    @Autowired
    private FishService fishService;

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
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addFish(@RequestBody FishRequest fishRequest){
        save(fishRequest);
        return ResponseEntity.ok("Fish has been created successfully!");
    }

    public Fish save(FishRequest fishRequest){
        Fish fish = new Fish();
        fish.setName(fishRequest.getName());
        fish.setMinTemperature(fishRequest.getMinTemperature());
        fish.setMaxTemperature(fishRequest.getMaxTemperature());
        return fishRepository.save(fish);
    }
}
