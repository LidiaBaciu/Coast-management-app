package com.example.coastmanagement.service;

import com.example.coastmanagement.model.ProblemsReported;
import com.example.coastmanagement.repository.ProblemsReportedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProblemsReportedService {
    @Autowired
    private ProblemsReportedRepository problemsReportedRepository;

    public List<ProblemsReported> getAllProblemsReported(){
        return problemsReportedRepository.findAll();
    }
}
