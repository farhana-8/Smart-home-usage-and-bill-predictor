package com.smartenergy.energy_backend.repository;

import com.smartenergy.energy_backend.model.EnergyUsage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnergyUsageRepository extends JpaRepository<EnergyUsage, Long> {

    List<EnergyUsage> findByUserUsername(String username);
}
