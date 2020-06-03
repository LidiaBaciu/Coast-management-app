package com.example.coastmanagement.service;

import com.example.coastmanagement.model.Beach;
import com.example.coastmanagement.repository.BeachRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BeachService {

    @Autowired
    private BeachRepository beachRepository;

    private static final Logger logger = LoggerFactory.getLogger(PollService.class);

    public List<Beach> getAllBeaches(){
        return beachRepository.findAll();
    }

}
