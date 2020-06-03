package com.example.coastmanagement.repository;

import com.example.coastmanagement.model.Buoy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BuoyRepository extends JpaRepository<Buoy, Long>{
    Optional<Buoy> findById(Long buoyId);

}