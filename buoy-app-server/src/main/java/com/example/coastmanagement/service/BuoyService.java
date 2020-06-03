package com.example.coastmanagement.service;

import com.example.coastmanagement.model.Buoy;
import com.example.coastmanagement.repository.BuoyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BuoyService {
    @Autowired
    private BuoyRepository buoyRepository;

    private static final Logger logger = LoggerFactory.getLogger(PollService.class);

    public List<Buoy> getAllBuoys() {
        return buoyRepository.findAll();
    }

}
