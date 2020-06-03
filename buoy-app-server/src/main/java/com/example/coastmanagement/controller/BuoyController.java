package com.example.coastmanagement.controller;

import com.example.coastmanagement.exception.ResourceNotFoundException;
import com.example.coastmanagement.model.Beach;
import com.example.coastmanagement.model.Buoy;
import com.example.coastmanagement.model.User;
import com.example.coastmanagement.payload.*;
import com.example.coastmanagement.repository.BeachRepository;
import com.example.coastmanagement.repository.BuoyRepository;
import com.example.coastmanagement.repository.UserRepository;
import com.example.coastmanagement.service.BuoyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BuoyController {

    @Autowired
    private BuoyRepository buoyRepository;

    @Autowired
    private BuoyService buoyService;

    @Autowired
    private BeachRepository beachRepository;

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/buoys/{id}")
    public BuoySummary getBuoy(@PathVariable(value = "id") Long id) {
        Buoy buoy = buoyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Buoy", "id", id));
        BuoySummary buoySummary = new BuoySummary(id, buoy.getLongitude(), buoy.getLatitude(), buoy.getSensors());
        return buoySummary;
    }

    @GetMapping("/buoys")
    public List<Buoy> getBuoys() {
        return buoyService.getAllBuoys();
    }

    @PostMapping("/buoy/create")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addBuoy(@RequestBody BuoyRequest buoyRequest){
        save(buoyRequest);
        return ResponseEntity.ok("Buoy has been created successfully!");
    }

    public Buoy save(BuoyRequest buoyRequest){
        Buoy buoy = new Buoy();
        buoy.setLatitude(buoyRequest.getLatitude());
        buoy.setLongitude(buoyRequest.getLongitude());
        Beach beach = beachRepository.findById(buoyRequest.getBeach_id()).orElseThrow(() -> new ResourceNotFoundException("Beach", "id", buoyRequest.getBeach_id()));
        User user = userRepository.findById(buoyRequest.getUser_id()).orElseThrow(() -> new ResourceNotFoundException("User", "id", buoyRequest.getUser_id()));
        user.getBuoys().add(buoy);
        beach.getBuoys().add(buoy);
        return buoyRepository.save(buoy);
    }
}
