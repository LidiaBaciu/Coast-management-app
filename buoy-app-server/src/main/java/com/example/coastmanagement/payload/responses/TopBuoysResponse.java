package com.example.coastmanagement.payload.responses;

import java.util.Collection;
import java.util.List;
import java.util.Set;

public class TopBuoysResponse {
    private Long label;
    private Integer numberOfProblems;

    public Long getLabel() {
        return label;
    }

    public void setLabel(Long label) {
        this.label = label;
    }

    public Integer getNumberOfProblems() {
        return numberOfProblems;
    }

    public void setNumberOfProblems(Integer numberOfProblems) {
        this.numberOfProblems = numberOfProblems;
    }
}
