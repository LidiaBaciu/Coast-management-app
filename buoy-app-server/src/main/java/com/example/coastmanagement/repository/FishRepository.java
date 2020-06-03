package com.example.coastmanagement.repository;

import com.example.coastmanagement.model.Fish;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FishRepository extends JpaRepository<Fish, Long> {
    Optional<Fish> findById(Long fishId);
}
