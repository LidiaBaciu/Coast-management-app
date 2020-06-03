package com.example.coastmanagement.service;


import com.example.coastmanagement.model.Buoy;
import com.example.coastmanagement.model.Fish;
import com.example.coastmanagement.repository.FishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FishService {
    @Autowired
    private FishRepository fishRepository;

    public List<Fish> getAllFish() {
        return fishRepository.findAll();
    }
}
