package com.example.coastmanagement.controller;

import com.example.coastmanagement.exception.ResourceNotFoundException;
import com.example.coastmanagement.model.Buoy;
import com.example.coastmanagement.model.ProblemReported;
import com.example.coastmanagement.model.User;
import com.example.coastmanagement.payload.*;
import com.example.coastmanagement.payload.requests.ProblemRequest;
import com.example.coastmanagement.payload.responses.ProblemResponse;
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
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

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
    @PreAuthorize("hasRole('ADMIN')")
    public List<ProblemResponse> getProblems(){
        List<ProblemResponse> problemsReportedResponses = new ArrayList<>();
        List<ProblemReported> problemsReported = problemsReportedService.getAllProblemsReported();
        for (ProblemReported problem : problemsReported) {
            ProblemResponse response = new ProblemResponse();
            response.setId(problem.getId());
            response.setDescription(problem.getDescription());
            response.setTimestamp(problem.getTimestamp());
            response.setBuoyId(problem.getBuoy().getId());
            response.setUsername(problem.getUser().getName());
            response.setSolved(problem.getSolved());
            problemsReportedResponses.add(response);
        }
        List<ProblemResponse> sortedUsers = problemsReportedResponses.stream()
                .sorted(Comparator.comparing(ProblemResponse::getTimestamp).reversed())
                .collect(Collectors.toList());
        return sortedUsers;
    }

    @PostMapping("/problem/create")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addProblem(@RequestBody ProblemRequest problemRequest){
        save(problemRequest);
        return ResponseEntity.ok("The problem has been reported successfully!");
    }

    public ProblemReported save(ProblemRequest projectRequest){
        ProblemReported problem = new ProblemReported();
        Buoy buoy = buoyRepository.findById(projectRequest.getBuoy().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Buoy", "id", projectRequest.getBuoy().getId()));
        problem.setBuoy(buoy);
        User user = userRepository.findById(projectRequest.getUser().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", projectRequest.getUser().getId()));
        problem.setUser(user);
        problem.setDescription(projectRequest.getDescription());
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        problem.setTimestamp(timestamp.toString());
        problem.setSolved(false);
        return problemsReportedRepository.save(problem);
    }

    @PutMapping("/problem/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> setProblemSolved(@PathVariable(value = "id") Long problemId){
        ProblemReported problem = problemsReportedRepository.findById(problemId)
                .orElseThrow(() -> new ResourceNotFoundException("Problem", "id", problemId));
        if(problem.getSolved() == null){
            problem.setSolved(false);
        }else{
            boolean isSolved = problem.getSolved();
            problem.setSolved(!isSolved);
        }
        problemsReportedRepository.save(problem);
        return ResponseEntity.ok("The problem has been successfully flagged as solved? " + problem.getSolved());
    }

    @GetMapping("/problem/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ProblemResponse getProblemBasedOnId(@PathVariable(value = "id") Long problemId){
        ProblemReported problem = problemsReportedRepository.findById(problemId)
                .orElseThrow(() -> new ResourceNotFoundException("Problem", "id", problemId));
        ProblemResponse problemResponse = new ProblemResponse();
        problemResponse.setId(problem.getId());
        problemResponse.setUsername(problem.getUser().getName());
        problemResponse.setDescription(problem.getDescription());
        problemResponse.setSolved(problem.getSolved());
        problemResponse.setBuoyId(problem.getBuoy().getId());
        problemResponse.setTimestamp(problem.getTimestamp());
        return problemResponse;
    }

}
