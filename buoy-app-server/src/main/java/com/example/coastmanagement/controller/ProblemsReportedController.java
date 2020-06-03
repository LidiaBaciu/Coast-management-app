package com.example.coastmanagement.controller;

import com.example.coastmanagement.exception.ResourceNotFoundException;
import com.example.coastmanagement.model.Buoy;
import com.example.coastmanagement.model.ProblemsReported;
import com.example.coastmanagement.model.Project;
import com.example.coastmanagement.model.User;
import com.example.coastmanagement.payload.*;
import com.example.coastmanagement.repository.BuoyRepository;
import com.example.coastmanagement.repository.ProblemsReportedRepository;
import com.example.coastmanagement.repository.UserRepository;
import com.example.coastmanagement.service.ProblemsReportedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ProblemsReportedController {
    @Autowired
    private ProblemsReportedRepository problemsReportedRepository;

    @Autowired
    private ProblemsReportedService problemsReportedService;

    @Autowired
    private BuoyRepository buoyRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/problems")
    public List<ProblemsReportedResponse> getProblems(){
        List<ProblemsReportedResponse> problemsReportedResponses = new ArrayList<>();
        List<ProblemsReported> problemsReported = problemsReportedService.getAllProblemsReported();
        for (ProblemsReported problem : problemsReported) {
            ProblemsReportedResponse response = new ProblemsReportedResponse();
            response.setId(problem.getId());
            response.setDescription(problem.getDescription());
            response.setTimestamp(problem.getTimestamp());
            BuoySummary buoySummary = new BuoySummary();
            buoySummary.setId(problem.getBuoy().getId());
            buoySummary.setLatitude(problem.getBuoy().getLatitude());
            buoySummary.setLongitude(problem.getBuoy().getLongitude());
            response.setBuoySummary(buoySummary);
            UserSummary userSummary = new UserSummary();
            userSummary.setId(problem.getUser().getId());
            userSummary.setName(problem.getUser().getName());
            userSummary.setUsername(problem.getUser().getUsername());
            response.setUserSummary(userSummary);
            problemsReportedResponses.add(response);
        }
        return problemsReportedResponses;
    }

    @PostMapping("/problem/create")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addProblem(@RequestBody ProblemRequest problemRequest){
        save(problemRequest);
        return ResponseEntity.ok("The problem has been reported successfully!");
    }

    public ProblemsReported save(ProblemRequest projectRequest){
        ProblemsReported problem = new ProblemsReported();
        Buoy buoy = buoyRepository.findById(projectRequest.getBuoy().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Buoy", "id", projectRequest.getBuoy().getId()));
        problem.setBuoy(buoy);
        User user = userRepository.findById(projectRequest.getUser().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", projectRequest.getUser().getId()));
        problem.setUser(user);
        problem.setDescription(projectRequest.getDescription());
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        problem.setTimestamp(timestamp.toString());
        return problemsReportedRepository.save(problem);
    }
}
