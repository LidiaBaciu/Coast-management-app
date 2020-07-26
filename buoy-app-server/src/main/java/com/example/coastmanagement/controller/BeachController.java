package com.example.coastmanagement.controller;

import com.example.coastmanagement.model.Beach;
import com.example.coastmanagement.payload.requests.BeachRequest;
import com.example.coastmanagement.payload.BeachSummary;
import com.example.coastmanagement.payload.responses.BeachResponse;
import com.example.coastmanagement.payload.responses.BuoyResponse;
import com.example.coastmanagement.repository.BeachRepository;
import com.example.coastmanagement.service.BeachService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
public class BeachController {
    @Autowired
    private BeachRepository beachRepository;

    @Autowired
    private BeachService beachService;

    @GetMapping("/beaches/{id}")
    public BeachSummary getBeach(@PathVariable(value = "id") Long id) {
        return beachService.getBeachSummary(id);
    }

    @GetMapping("/beaches")
    public List<BeachResponse> getBeaches() {
        return beachService.getBeaches();
    }

    @GetMapping("/beach/{id}/buoys")
    public List<BuoyResponse> getBuoysFromBeach(@PathVariable(value = "id") Long id){
        return beachService.getBuoysOnBeach(id);
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
        beach.setCityName(beachRequest.getCityName());
        return beachRepository.save(beach);
    }

}
