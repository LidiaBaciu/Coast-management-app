package com.example.coastmanagement.controller;

import com.example.coastmanagement.exception.ResourceNotFoundException;
import com.example.coastmanagement.model.Beach;
import com.example.coastmanagement.model.Buoy;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

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
    @PreAuthorize("hasRole('USER')")
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
}
