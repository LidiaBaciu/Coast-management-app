package com.example.coastmanagement.controller;

import com.example.coastmanagement.exception.ResourceNotFoundException;
import com.example.coastmanagement.model.*;
import com.example.coastmanagement.payload.*;
import com.example.coastmanagement.payload.requests.BuoyRequest;
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

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

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

    @GetMapping("/buoys/options")
    public BeachAuxiliary getBuoysOptions() {
        List<User> users = userRepository.findAll();
        List<UserSummary> usersRoleAdmin = new ArrayList<>();
        for (User user : users) {
            RoleName roleName = user.getRoles().stream().findFirst().get().getName();
            if(roleName.toString().contains("ADMIN")){
                UserSummary userSummary = new UserSummary(user.getId(), user.getUsername(), user.getName(), roleName);
                usersRoleAdmin.add(userSummary);
            }
        }
        List<Beach> beaches = beachRepository.findAll();
        List<BeachSummary> beachSummaries = new ArrayList<>();
        for(Beach beach : beaches){
            BeachSummary beachSummary = new BeachSummary(beach.getId(), beach.getName(),
                    beach.getLongitude(), beach.getLatitude(),
                    beach.getPhotoUri());
            beachSummaries.add(beachSummary);
        }

        BeachAuxiliary response = new BeachAuxiliary(usersRoleAdmin, beachSummaries);
        return response;
    }

    @GetMapping("/buoys")
    public List<BuoySummary> getBuoys() {
        List<BuoySummary> buoySummaries = new ArrayList<>();

        for(Buoy buoy : buoyService.getAllBuoys()){
            for(Sensor sensor : buoy.getSensors()){
                if(sensor.getName().equals("temperature")){
                    List<SensorValue> sortedValues = sensor.getSensorValues().stream()
                            .sorted(Comparator.comparing(SensorValue::getTimestamp).reversed())
                            .collect(Collectors.toList());
                    System.out.println(sortedValues.toString());
                    BuoySummary buoySummary = new BuoySummary(buoy.getId(), buoy.getLongitude(), buoy.getLatitude(), buoy.getSensors());
                    buoySummary.setLatestTemperature(sortedValues.get(0).getValue());
                    buoySummaries.add(buoySummary);
                    break;
                }
            }
        }
        return buoySummaries;
    }

    @PostMapping("/buoy/create")
    @PreAuthorize("hasRole('ADMIN')")
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

    private class BeachAuxiliary{
        List<UserSummary> userSummaryList;
        List<BeachSummary> beachSummaryList;

        public BeachAuxiliary(List<UserSummary> userSummaryList, List<BeachSummary> beachSummaryList) {
            this.userSummaryList = userSummaryList;
            this.beachSummaryList = beachSummaryList;
        }

        public List<UserSummary> getUserSummaryList() {
            return userSummaryList;
        }

        public void setUserSummaryList(List<UserSummary> userSummaryList) {
            this.userSummaryList = userSummaryList;
        }

        public List<BeachSummary> getBeachSummaryList() {
            return beachSummaryList;
        }

        public void setBeachSummaryList(List<BeachSummary> beachSummaryList) {
            this.beachSummaryList = beachSummaryList;
        }
    }
}
