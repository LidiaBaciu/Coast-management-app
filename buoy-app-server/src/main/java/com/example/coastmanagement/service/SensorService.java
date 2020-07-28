package com.example.coastmanagement.service;

import com.example.coastmanagement.model.Sensor;
import com.example.coastmanagement.model.SensorValue;
import com.example.coastmanagement.payload.responses.StatisticsResponse;
import com.example.coastmanagement.repository.SensorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormatSymbols;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoField;
import java.time.temporal.TemporalAccessor;
import java.util.*;

@Service
public class SensorService {

    @Autowired
    private SensorRepository sensorRepository;

    public List<Sensor> getAllSensors() {
        return sensorRepository.findAll();
    }

    public List<SensorValue> getTodaysSensors(boolean all, boolean temperature){
        String type = (temperature) ? "temperature" : "ph";
        List<SensorValue> todaysSensors = new ArrayList<>();
        for(Sensor sensor: sensorRepository.findAll()){
            if(all || sensor.getName().equalsIgnoreCase(type)) {
                for (SensorValue sensorValue : sensor.getSensorValues()) {
                    String sensorDate = sensorValue.getTimestamp();
                    String dateNow = LocalDate.now().toString();
                    System.out.println("sensorDate: " + sensorDate);
                    System.out.println("dateNow: " + dateNow);
                    if (sensorDate.contains(dateNow)) {
                        todaysSensors.add(sensorValue);
                    }
                }
            }
        }
        return todaysSensors;
    }

    public List<SensorValue> getThisMonthsSensors(boolean all, boolean temperature){
        String type = (temperature) ? "temperature" : "ph";
        List<SensorValue> thisMonthsSensors = new ArrayList<>();
        for(Sensor sensor: sensorRepository.findAll()){
            if(all || sensor.getName().equalsIgnoreCase(type)){
                for(SensorValue sensorValue : sensor.getSensorValues()){
                    String sensorDate = sensorValue.getTimestamp();
                    String sensorMonth =  sensorDate.split(" ")[1];
                    String dateNow = LocalDate.now().toString();
                    String thisMonth = dateNow.split(" ")[1];
                    if(sensorMonth.equalsIgnoreCase(thisMonth)){
                        thisMonthsSensors.add(sensorValue);
                    }
                }
            }
        }
        return thisMonthsSensors;
    }

    public List<SensorValue> getThisYearsSensors(boolean all, boolean temperature){
        String type = (temperature) ? "temperature" : "ph";
        List<SensorValue> thisYearsSensors = new ArrayList<>();
        for(Sensor sensor: sensorRepository.findAll()){
            if(all || sensor.getName().equalsIgnoreCase(type)) {
                for (SensorValue sensorValue : sensor.getSensorValues()) {
                    String sensorDate = sensorValue.getTimestamp();
                    String sensorYear = sensorDate.split(" ")[0].split("-")[0];
                    String dateNow = LocalDate.now().toString();
                    String thisYear = dateNow.split(" ")[0].split("-")[0];
                    if (sensorYear.equalsIgnoreCase(thisYear)) {
                        thisYearsSensors.add(sensorValue);
                    }
                }
            }
        }
        return thisYearsSensors;
    }

    public List<StatisticsResponse> getTodaysStatistics(){
        HashMap<String, Float> temperatureStatistics = new HashMap<>();
        HashMap<String, Float> phStatistics = new HashMap<>();

        for(SensorValue value : getTodaysSensors(false, true)) {
            String before = value.getTimestamp().split(" ")[1]; // "Before"
            if (temperatureStatistics.containsKey(before)) {
                temperatureStatistics.put(before, (temperatureStatistics.get(before) + value.getValue()) / 2);
            } else {
                temperatureStatistics.put(before, value.getValue());
            }
        }

        for(SensorValue value : getTodaysSensors(false, false)) {
            String before = value.getTimestamp().split(" ")[1]; // "Before"
            if (phStatistics.containsKey(before)) {
                phStatistics.put(before, (phStatistics.get(before) + value.getValue()) / 2);
            } else {
                phStatistics.put(before, value.getValue());
            }
        }

        return retrieveStatistics(temperatureStatistics, phStatistics);
    }
    public List<StatisticsResponse> getAverageThisYear(){
        HashMap<String, Float> temperatureStatistics = new HashMap<>();
        HashMap<String, Float> phStatistics = new HashMap<>();

        for(SensorValue value : getThisYearsSensors(false, true)) {
            String before = value.getTimestamp().split(" ")[0]; // "Before"
            if (temperatureStatistics.containsKey(before)) {
                temperatureStatistics.put(before, (temperatureStatistics.get(before) + value.getValue()) / 2);
            } else {
                temperatureStatistics.put(before, value.getValue());
            }
        }

        for(SensorValue value : getThisYearsSensors(false, false)) {
            String before = value.getTimestamp().split(" ")[0]; // "Before"
            if (phStatistics.containsKey(before)) {
                phStatistics.put(before, (phStatistics.get(before) + value.getValue()) / 2);
            } else {
                phStatistics.put(before, value.getValue());
            }
        }

        return retrieveStatistics(temperatureStatistics, phStatistics);
    }

    public TreeMap<String, Float> getSensorValuesCurrentYear(boolean temperature, boolean ph){
        TreeMap<String, Float> temperatureStatistics = new TreeMap<>();
        TreeMap<String, Float> phStatistics = new TreeMap<>();

        for(SensorValue value : getThisYearsSensors(false, true)) {
            int month = Integer.parseInt(value.getTimestamp().split("-")[1]);
            String stringValueOfMonth = String.valueOf(month);
            if (temperatureStatistics.containsKey(stringValueOfMonth)) {
                temperatureStatistics.put(stringValueOfMonth, (temperatureStatistics.get(stringValueOfMonth) + value.getValue()) / 2);
            } else {
                temperatureStatistics.put(stringValueOfMonth, value.getValue());
            }
            /*String monthString = new DateFormatSymbols().getMonths()[month-1];
            if (temperatureStatistics.containsKey(monthString)) {
                temperatureStatistics.put(monthString, (temperatureStatistics.get(monthString) + value.getValue()) / 2);
            } else {
                temperatureStatistics.put(monthString, value.getValue());
            }
             */
        }

        for(SensorValue value : getThisYearsSensors(false, false)) {
            int month = Integer.parseInt(value.getTimestamp().split("-")[1]);
            //String monthString = new DateFormatSymbols().getMonths()[month-1];
            String monthString = String.valueOf(month);
            if (phStatistics.containsKey(monthString)) {
                phStatistics.put(monthString, (phStatistics.get(monthString) + value.getValue()) / 2);
            } else {
                phStatistics.put(monthString, value.getValue());
            }
        }

        if(temperature){
            return temperatureStatistics;
        }
        return phStatistics;
    }

    public static void sortbyMonth(HashMap<String, Float> unsortedMap)
    {
        DateTimeFormatter parser = DateTimeFormatter.ofPattern("MMM")
                .withLocale(Locale.ENGLISH);
        TemporalAccessor accessor = parser.parse("Feb");
        System.out.println(accessor.get(ChronoField.MONTH_OF_YEAR));  // prints 2
        // TreeMap to store values of HashMap
        TreeMap<String, Float> sorted = new TreeMap<>();

        // Copy all data from hashMap into TreeMap
        sorted.putAll(unsortedMap);

        // Display the TreeMap which is naturally sorted
        for (Map.Entry<String, Float> entry : sorted.entrySet())
            System.out.println("Key = " + entry.getKey() +
                    ", Value = " + entry.getValue());
    }

    public List<StatisticsResponse> retrieveStatistics(HashMap<String, Float> temperatureStatistics, HashMap<String, Float> phStatistics) {
        List<StatisticsResponse> statisticsResponseList = new ArrayList<>();
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
        return statisticsResponseList;
    }
}
