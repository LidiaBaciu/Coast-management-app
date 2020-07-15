package com.example.coastmanagement.service;

import com.example.coastmanagement.model.ProblemReported;
import com.example.coastmanagement.payload.responses.TopBuoysResponse;
import com.example.coastmanagement.repository.ProblemsReportedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProblemsReportedService {
    @Autowired
    private ProblemsReportedRepository problemsReportedRepository;

    public List<ProblemReported> getAllProblemsReported(){
        return problemsReportedRepository.findAll();
    }

    public List<TopBuoysResponse> getNumberOfProblemsPerBuoy(){
        List<TopBuoysResponse> topBuoysResponseList = new ArrayList<>();
        HashMap<Long, Integer> topBuoys = new HashMap<>();
        for(ProblemReported problemReported : problemsReportedRepository.findAll()){
            Long buoyId = problemReported.getBuoy().getId();
            if(topBuoys.containsKey(buoyId)){
                topBuoys.put(buoyId, topBuoys.get(buoyId) + 1);
            } else {
                topBuoys.put(buoyId, 1);
            }
        }
        for (Map.Entry<Long, Integer> entry : topBuoys.entrySet()) {
            TopBuoysResponse topBuoysResponse = new TopBuoysResponse();
            Long key = entry.getKey();
            Integer value = entry.getValue();
            topBuoysResponse.setLabel(key);
            topBuoysResponse.setNumberOfProblems(value);
            topBuoysResponseList.add(topBuoysResponse);
        }
        return topBuoysResponseList;
    }

    public int getNumberOfProblemsBy(boolean newProblems, boolean solvedProblems){
        int numberOfNewProblems = 0;
        int numberOfProblemsSolved = 0;
        for(ProblemReported problemReported : problemsReportedRepository.findAll()){
            String formatted = problemReported.getTimestamp();
            System.out.println(formatted);
            final String before = formatted.split(" ")[0]; // "Before"
            String dateNow = LocalDate.now().toString().split(" ")[0];
            if(dateNow.contains(before) && newProblems){
                numberOfNewProblems++;
            }
            if(problemReported.getSolved()!= null && problemReported.getSolved() && solvedProblems){
                numberOfProblemsSolved++;
            }
        }
        if(solvedProblems){
            return numberOfProblemsSolved;
        }
        return numberOfNewProblems;
    }
}
