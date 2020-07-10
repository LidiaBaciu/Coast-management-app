package com.example.coastmanagement.controller;

import com.example.coastmanagement.exception.ResourceNotFoundException;
import com.example.coastmanagement.model.*;
import com.example.coastmanagement.payload.BeachSummary;
import com.example.coastmanagement.payload.BuoySummary;
import com.example.coastmanagement.payload.responses.*;
import com.example.coastmanagement.repository.*;
import com.example.coastmanagement.service.BeachService;
import com.example.coastmanagement.service.BuoyService;
import com.example.coastmanagement.service.ProblemsReportedService;
import com.example.coastmanagement.service.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.DateFormatSymbols;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class AuxiliaryController {

    @Autowired
    private ProblemsReportedRepository problemsReportedRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SensorService sensorService;

    @Autowired
    private BuoyService buoyService;

    @Autowired
    private BeachService beachService;

    @GetMapping("/home")
    public AuxiliaryResponse getDetails() {
        AuxiliaryResponse auxiliaryResponse = new AuxiliaryResponse();

        int newUsers = 0;
        int newProblems = 0;
        int problemsSolved = 0;

        HashMap<Long, Integer> topBuoys = new HashMap<>();
        HashMap<String, Float> temperatureStatistics = new HashMap<>();
        HashMap<String, Float> phStatistics = new HashMap<>();
        List<StatisticsResponse> statisticsResponseList = new ArrayList<>();
        List<TopBuoysResponse> topBuoysResponseList = new ArrayList<>();

        for(User user : userRepository.findAll()){
            LocalDateTime datetime = LocalDateTime.ofInstant(user.getCreatedAt(), ZoneOffset.UTC);
            String formatted = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss").format(datetime);
            System.out.println(formatted);
            final String before = formatted.split(" ")[0]; // "Before"
            String dateNow = LocalDate.now().toString().split(" ")[0];
            if(dateNow.contains(before)){
                newUsers++;
            }
        }
        for(ProblemReported problemReported : problemsReportedRepository.findAll()){
            String formatted = problemReported.getTimestamp();
            System.out.println(formatted);
            final String before = formatted.split(" ")[0]; // "Before"
            String dateNow = LocalDate.now().toString().split(" ")[0];
            if(dateNow.contains(before)){
                newProblems++;
            }
            if(problemReported.getSolved()!= null && problemReported.getSolved()){
                problemsSolved++;
            }
            Long buoyId = problemReported.getBuoy().getId();
            if(topBuoys.containsKey(buoyId)){
                topBuoys.put(buoyId, topBuoys.get(buoyId) + 1);
            } else {
                topBuoys.put(buoyId, 1);
            }
        }

        for(Sensor sensor : sensorService.getAllSensors()){
            for(SensorValue value : sensor.getSensorValues()){
                String before = value.getTimestamp().split(" ")[0]; // "Before"
                if(sensor.getName().equals("temperature")) {
                    if (temperatureStatistics.containsKey(before)) {
                        temperatureStatistics.put(before, (temperatureStatistics.get(before) + value.getValue()) / 2);
                    } else {
                        temperatureStatistics.put(before, value.getValue());
                    }
                }else{
                    if (phStatistics.containsKey(before)) {
                        phStatistics.put(before, (phStatistics.get(before) + value.getValue()) / 2);
                    } else {
                        phStatistics.put(before, value.getValue());
                    }
                }
            }
        }

        auxiliaryResponse.setTotalRegisteredUsers(userRepository.findAll().size());
        auxiliaryResponse.setNewlyRegisteredUsers(newUsers);
        auxiliaryResponse.setNewlyProblemsReported(newProblems);
        auxiliaryResponse.setTotalProblemsReported(problemsReportedRepository.findAll().size());
        auxiliaryResponse.setProblemsSolved(problemsSolved);


        for (Map.Entry<String, Float> entry : temperatureStatistics.entrySet()) {
            StatisticsResponse statisticsResponse = new StatisticsResponse();
            String key = entry.getKey();
            Float value = entry.getValue();
            statisticsResponse.setTime(key);
            statisticsResponse.setTemperature(value);
            if(phStatistics.containsKey(key)){
                statisticsResponse.setPh(phStatistics.get(key));
            }
            statisticsResponseList.add(statisticsResponse);
        }
        for (Map.Entry<Long, Integer> entry : topBuoys.entrySet()) {
            TopBuoysResponse topBuoysResponse = new TopBuoysResponse();
            Long key = entry.getKey();
            Integer value = entry.getValue();
            topBuoysResponse.setLabel(key);
            topBuoysResponse.setNumberOfProblems(value);
            topBuoysResponseList.add(topBuoysResponse);
        }

        auxiliaryResponse.setStatisticsResponse(statisticsResponseList);
        auxiliaryResponse.setTopBuoysResponse(topBuoysResponseList);
        auxiliaryResponse.setNumberOfBeaches(beachService.getAllBeaches().size());
        auxiliaryResponse.setNumberOfBuoys(buoyService.getAllBuoys().size());
        auxiliaryResponse.setNumberOfSensors(sensorService.getAllSensors().size());
        auxiliaryResponse.setNumberOfSensorValuesToday(sensorService.getTodaysSensors().size());
        return auxiliaryResponse;
    }

    @GetMapping("/home/statistics/yearly/temperature")
    public YearlyStatisticsResponse getYearlyStatisticsTemperature() {
        YearlyStatisticsResponse auxiliaryResponse = new YearlyStatisticsResponse();
        List<StatisticsResponse> statisticsResponseList = new ArrayList<>();

        HashMap<String, Float> temperatureStatistics = new HashMap<>();
        HashMap<String, Float> phStatistics = new HashMap<>();

        for(Sensor sensor : sensorService.getAllSensors()){
            for(SensorValue value : sensor.getSensorValues()){
                int month = Integer.parseInt(value.getTimestamp().split("-")[1]);
                String monthString = new DateFormatSymbols().getMonths()[month-1];
                if(sensor.getName().equals("temperature")) {
                    if (temperatureStatistics.containsKey(monthString)) {
                        temperatureStatistics.put(monthString, (temperatureStatistics.get(monthString) + value.getValue()) / 2);
                    } else {
                        temperatureStatistics.put(monthString, value.getValue());
                    }
                }else{
                    if (phStatistics.containsKey(monthString)) {
                        phStatistics.put(monthString, (phStatistics.get(monthString) + value.getValue()) / 2);
                    } else {
                        phStatistics.put(monthString, value.getValue());
                    }
                }
            }
        }

        for (Map.Entry<String, Float> entry : temperatureStatistics.entrySet()) {
            StatisticsResponse statisticsResponse = new StatisticsResponse();
            String key = entry.getKey();
            Float value = entry.getValue();
            statisticsResponse.setTime(key);
            statisticsResponse.setTemperature(value);
            if(phStatistics.containsKey(key)){
                statisticsResponse.setPh(phStatistics.get(key));
            }
            statisticsResponseList.add(statisticsResponse);
        }
        auxiliaryResponse.setLabels(temperatureStatistics.keySet());
        auxiliaryResponse.setTemperatureValues(temperatureStatistics.values());
        auxiliaryResponse.setPhValues(phStatistics.values());
        return auxiliaryResponse;
    }

    private static HashMap sortByValues(HashMap map) {
        List list = new LinkedList(map.entrySet());
        // Defined Custom Comparator here
        Collections.sort(list, new Comparator() {
            public int compare(Object o1, Object o2) {
                return ((Comparable) ((Map.Entry) (o2)).getValue())
                        .compareTo(((Map.Entry) (o1)).getValue());
            }
        });

        // Here I am copying the sorted list in HashMap
        // using LinkedHashMap to preserve the insertion order
        HashMap sortedHashMap = new LinkedHashMap();
        for (Iterator it = list.iterator(); it.hasNext();) {
            Map.Entry entry = (Map.Entry) it.next();
            sortedHashMap.put(entry.getKey(), entry.getValue());
        }
        return sortedHashMap;
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
