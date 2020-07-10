package com.example.coastmanagement.payload.responses;

import java.util.Collection;
import java.util.List;
import java.util.Set;

public class YearlyStatisticsResponse {
    private Set<String> labels;
    private Collection temperatureValues;
    private Collection phValues;

    public Set<String> getLabels() {
        return labels;
    }

    public void setLabels(Set<String> labels) {
        this.labels = labels;
    }

    public Collection getTemperatureValues() {
        return temperatureValues;
    }

    public void setTemperatureValues(Collection temperatureValues) {
        this.temperatureValues = temperatureValues;
    }

    public Collection getPhValues() {
        return phValues;
    }

    public void setPhValues(Collection phValues) {
        this.phValues = phValues;
    }
}
