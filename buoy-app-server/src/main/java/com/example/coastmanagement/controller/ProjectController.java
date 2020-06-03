package com.example.coastmanagement.controller;

import com.example.coastmanagement.exception.ResourceNotFoundException;
import com.example.coastmanagement.model.Buoy;
import com.example.coastmanagement.model.Project;
import com.example.coastmanagement.payload.BuoySummary;
import com.example.coastmanagement.payload.ProjectRequest;
import com.example.coastmanagement.payload.ProjectResponse;
import com.example.coastmanagement.repository.BuoyRepository;
import com.example.coastmanagement.repository.ProjectRepository;
import com.example.coastmanagement.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ProjectController {
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private BuoyRepository buoyRepository;

    @GetMapping("/projects")
    public List<ProjectResponse> getProjects() {
        List<Project> projects = projectService.getAllProject();
        List<ProjectResponse> projectResponses = new ArrayList<>();
        for (Project project : projects) {
            ProjectResponse projectResponse = new ProjectResponse();
            projectResponse.setId(project.getId());
            projectResponse.setDescription(project.getDescription());
            projectResponse.setName(project.getName());
            projectResponse.setStatus(project.getStatus());
            projectResponses.add(projectResponse);
        }
        return projectResponses;
    }

    @GetMapping("/buoy/{id}/projects")
    public List<Project> getBuoy(@PathVariable(value = "id") Long id) {
        List<Project> projectsForGivenBuoy = new ArrayList<>();
        Buoy buoy = buoyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Buoy", "id", id));
        BuoySummary buoySummary = null;
        List<Project> projects = projectService.getAllProject();
        for (Project project : projects) {
            if(project.getBuoys().contains(buoy)){
                projectsForGivenBuoy.add(project);
            }
        }
        return projectsForGivenBuoy;
    }

    @PostMapping("/project/create")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addProject(@RequestBody ProjectRequest projectRequest){
        System.out.println(projectRequest);
        save(projectRequest);
        return ResponseEntity.ok("The project has been created successfully!");
    }

    public Project save(ProjectRequest projectRequest){
        Project project = new Project();
        project.setName(projectRequest.getName());
        project.setDescription(projectRequest.getDescription());
        project.setStatus(projectRequest.getStatus());
        List<Buoy> buoysIds = projectRequest.getBuoys();

        for (Buoy currentBuoyId : buoysIds) {
            Buoy buoy = buoyRepository.findById(currentBuoyId.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Buoy", "id", currentBuoyId));
            project.getBuoys().add(buoy);
        }
        return projectRepository.save(project);
    }
}
