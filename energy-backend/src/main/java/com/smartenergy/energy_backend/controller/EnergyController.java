package com.smartenergy.energy_backend.controller;

import com.smartenergy.energy_backend.dto.EnergyUsageRequestDTO;
import com.smartenergy.energy_backend.model.EnergyUsage;
import com.smartenergy.energy_backend.service.EnergyService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/energy")
public class EnergyController {

    private final EnergyService energyService;

    public EnergyController(EnergyService energyService) {
        this.energyService = energyService;
    }

    // ✅ ADD ENERGY
    @PostMapping("/add")
    public EnergyUsage addEnergy(
            @RequestBody EnergyUsageRequestDTO dto,
            Authentication authentication
    ) {
        String username = authentication.getName();
        return energyService.addUsage(dto.getUnitsConsumed(), username);
    }

    // ✅ VIEW ALL
    @GetMapping("/all")
    public List<EnergyUsage> getAll() {
        return energyService.getAllUsage();
    }

    // ✅ USER HISTORY
    @GetMapping("/my")
    public List<EnergyUsage> myUsage(Authentication authentication) {
        return energyService.getUsageByUser(authentication.getName());
    }
    @GetMapping("/rewards")
    public ResponseEntity<Integer> getRewardPoints(Authentication authentication) {

        String username = authentication.getName();

        int rewardPoints = energyService.getRewardPoints(username);

        return ResponseEntity.ok(rewardPoints);
    }

}
