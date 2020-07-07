package com.example.coastmanagement.payload.responses;

import java.util.Collection;
import java.util.List;
import java.util.Set;

public class TopBuoysResponse {
    private Set<String> labels;
    private Collection values;

    public Set<String> getLabels() {
        return labels;
    }

    public void setLabels(Set<String> labels) {
        this.labels = labels;
    }

    public Collection getValues() {
        return values;
    }

    public void setValues(Collection values) {
        this.values = values;
    }
}
