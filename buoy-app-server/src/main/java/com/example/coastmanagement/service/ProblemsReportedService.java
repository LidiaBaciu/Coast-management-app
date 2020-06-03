package com.example.coastmanagement.service;

import com.example.coastmanagement.model.ProblemReported;
import com.example.coastmanagement.repository.ProblemsReportedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProblemsReportedService {
    @Autowired
    private ProblemsReportedRepository problemsReportedRepository;

    public List<ProblemReported> getAllProblemsReported(){
        return problemsReportedRepository.findAll();
    }
}
