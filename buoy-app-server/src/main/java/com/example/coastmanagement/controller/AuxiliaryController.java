package com.example.coastmanagement.controller;

import com.example.coastmanagement.model.*;
import com.example.coastmanagement.payload.BeachSummary;
import com.example.coastmanagement.payload.BuoySummary;
import com.example.coastmanagement.payload.responses.*;
import com.example.coastmanagement.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class AuxiliaryController {


    @Autowired
    private ProblemsReportedService problemsReportedService;

    @Autowired
    private UserService userService;

    @Autowired
    private SensorService sensorService;

    @Autowired
    private BuoyService buoyService;

    @Autowired
    private BeachService beachService;

    @GetMapping("/home")
    public AuxiliaryResponse getDetails() {
        
        AuxiliaryResponse auxiliaryResponse = new AuxiliaryResponse();

        auxiliaryResponse.setTotalRegisteredUsers(userService.getAllUsers().size());
        auxiliaryResponse.setNewlyRegisteredUsers(userService.getNumberOfNewUsers());
        auxiliaryResponse.setNewlyProblemsReported(problemsReportedService.getNumberOfProblemsBy(true,false));
        auxiliaryResponse.setTotalProblemsReported(problemsReportedService.getAllProblemsReported().size());
        auxiliaryResponse.setProblemsSolved(problemsReportedService.getNumberOfProblemsBy(false, true));
        auxiliaryResponse.setNumberOfBeaches(beachService.getAllBeaches().size());
        auxiliaryResponse.setNumberOfBuoys(buoyService.getAllBuoys().size());
        auxiliaryResponse.setNumberOfSensors(sensorService.getAllSensors().size());
        auxiliaryResponse.setNumberOfSensorValuesToday(sensorService.getTodaysSensors(true, false).size());
        auxiliaryResponse.setTopBuoysResponse(problemsReportedService.getNumberOfProblemsPerBuoy());
        auxiliaryResponse.setStatisticsResponse(sensorService.getTodaysStatistics());

        return auxiliaryResponse;
    }

    @GetMapping("/home/statistics/yearly/temperature")
    public YearlyStatisticsResponse getYearlyStatistics() {
        YearlyStatisticsResponse auxiliaryResponse = new YearlyStatisticsResponse();

        auxiliaryResponse.setLabels(sensorService.getSensorValuesCurrentYear(true, false).keySet());
        auxiliaryResponse.setTemperatureValues(sensorService.getSensorValuesCurrentYear(true, false).values());
        auxiliaryResponse.setPhValues(sensorService.getSensorValuesCurrentYear(false, true).values());
        return auxiliaryResponse;
    }

    @GetMapping("/home/map")
    public MapResponse getMapDetails() {
        MapResponse mapResponse = new MapResponse();
        List<BuoySummary> buoySummaries = new ArrayList<>();
        List<BeachSummary> beachSummaries = new ArrayList<>();

        for(Buoy buoy : buoyService.getAllBuoys()){
            BuoySummary buoySummary = new BuoySummary();
            buoySummary.setId(buoy.getId());
            buoySummary.setLatitude(buoy.getLatitude());
            buoySummary.setLongitude(buoy.getLongitude());
            for(Sensor sensor : buoy.getSensors()){
                if(sensor.getName().equals("temperature")){
                    List<SensorValue> sortedValues = sensor.getSensorValues().stream()
                            .sorted(Comparator.comparing(SensorValue::getTimestamp).reversed())
                            .collect(Collectors.toList());
                    System.out.println(sortedValues.toString());
                    buoySummary.setLatestTemperature(sortedValues.get(0).getValue());
                    break;
                }
            }
            buoySummaries.add(buoySummary);
        }

        for(Beach beach : beachService.getAllBeaches()){
            BeachSummary beachSummary = new BeachSummary(beach.getId(), beach.getName(),
                    beach.getLongitude(), beach.getLatitude(),
                    beach.getPhotoUri());
            beachSummaries.add(beachSummary);
        }
        mapResponse.setBuoySummaryList(buoySummaries);
        mapResponse.setBeachSummaryList(beachSummaries);
        return mapResponse;
    }


}
