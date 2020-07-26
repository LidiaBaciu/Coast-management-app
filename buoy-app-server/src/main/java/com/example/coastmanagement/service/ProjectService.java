package com.example.coastmanagement.service;

import com.example.coastmanagement.model.Project;
import com.example.coastmanagement.repository.ProjectRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    public List<Project> getAllProject() {
        return projectRepository.findAll();
    }
}
