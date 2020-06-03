package com.example.coastmanagement.repository;

import com.example.coastmanagement.model.ProblemsReported;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProblemsReportedRepository extends JpaRepository<ProblemsReported, Long> {
    Optional<ProblemsReported> findById(Long problemId);
}
