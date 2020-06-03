package com.example.coastmanagement.repository;

import com.example.coastmanagement.model.ProblemReported;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProblemsReportedRepository extends JpaRepository<ProblemReported, Long> {
    Optional<ProblemReported> findById(Long problemId);
}
