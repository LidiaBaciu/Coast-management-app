package com.example.coastmanagement.repository;

import com.example.coastmanagement.model.Beach;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BeachRepository extends JpaRepository<Beach, Long> {
    Optional<Beach> findById(Long beachId);
}
