package com.example.coastmanagement.payload.responses;

import com.example.coastmanagement.payload.BeachSummary;
import com.example.coastmanagement.payload.BuoySummary;

import java.util.List;

public class MapResponse {
    List<BuoySummary> buoySummaryList;
    List<BeachSummary> beachSummaryList;

    public List<BuoySummary> getBuoySummaryList() {
        return buoySummaryList;
    }

    public void setBuoySummaryList(List<BuoySummary> buoySummaryList) {
        this.buoySummaryList = buoySummaryList;
    }

    public List<BeachSummary> getBeachSummaryList() {
        return beachSummaryList;
    }

    public void setBeachSummaryList(List<BeachSummary> beachSummaryList) {
        this.beachSummaryList = beachSummaryList;
    }
}
