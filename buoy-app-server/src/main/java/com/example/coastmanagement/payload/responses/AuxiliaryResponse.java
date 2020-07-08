package com.example.coastmanagement.payload.responses;

import java.util.HashMap;
import java.util.List;

public class AuxiliaryResponse {
    private int totalRegisteredUsers;
    private int newlyRegisteredUsers;
    private int totalProblemsReported;
    private int newlyProblemsReported;
    private int problemsSolved;
    private List<TopBuoysResponse> topBuoysResponse;
    private List<StatisticsResponse> statisticsResponse;

    public int getTotalRegisteredUsers() {
        return totalRegisteredUsers;
    }

    public void setTotalRegisteredUsers(int totalRegisteredUsers) {
        this.totalRegisteredUsers = totalRegisteredUsers;
    }

    public int getNewlyRegisteredUsers() {
        return newlyRegisteredUsers;
    }

    public void setNewlyRegisteredUsers(int newlyRegisteredUsers) {
        this.newlyRegisteredUsers = newlyRegisteredUsers;
    }

    public int getTotalProblemsReported() {
        return totalProblemsReported;
    }

    public void setTotalProblemsReported(int totalProblemsReported) {
        this.totalProblemsReported = totalProblemsReported;
    }

    public int getNewlyProblemsReported() {
        return newlyProblemsReported;
    }

    public void setNewlyProblemsReported(int newlyProblemsReported) {
        this.newlyProblemsReported = newlyProblemsReported;
    }

    public int getProblemsSolved() {
        return problemsSolved;
    }

    public void setProblemsSolved(int problemsSolved) {
        this.problemsSolved = problemsSolved;
    }

    public List<StatisticsResponse> getStatisticsResponse() {
        return statisticsResponse;
    }

    public void setStatisticsResponse(List<StatisticsResponse> statisticsResponse) {
        this.statisticsResponse = statisticsResponse;
    }

    public List<TopBuoysResponse> getTopBuoysResponse() {
        return topBuoysResponse;
    }

    public void setTopBuoysResponse(List<TopBuoysResponse> topBuoysResponse) {
        this.topBuoysResponse = topBuoysResponse;
    }
}
