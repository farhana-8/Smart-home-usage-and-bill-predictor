package com.smartenergy.energy_backend.service;

import com.smartenergy.energy_backend.model.EnergyUsage;
import com.smartenergy.energy_backend.model.User;
import com.smartenergy.energy_backend.repository.EnergyUsageRepository;
import com.smartenergy.energy_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EnergyService {

    private final EnergyUsageRepository energyRepo;
    private final UserRepository userRepo;

    public EnergyService(EnergyUsageRepository energyRepo, UserRepository userRepo) {
        this.energyRepo = energyRepo;
        this.userRepo = userRepo;
    }

    // ✅ ADD ENERGY (backend calculates bill)
    public EnergyUsage addUsage(Double unitsConsumed, String username) {

        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        double billAmount;

        // 🔹 BILL CALCULATION (same as before)
        if (unitsConsumed <= 100) {
            billAmount = unitsConsumed * 2;
        } else if (unitsConsumed <= 200) {
            billAmount = (100 * 2) + ((unitsConsumed - 100) * 3);
        } else {
            billAmount = (100 * 3) + (100 * 5) + ((unitsConsumed - 200) * 10);
        }

        // 🔹 REWARD CALCULATION (LOW USAGE = HIGH REWARD)
        int rewardEarned;

        if (unitsConsumed <= 100) {
            rewardEarned = 100;
        } else if (unitsConsumed <= 200) {
            rewardEarned = 50;
        } else {
            rewardEarned = 10;
        }

        // 🔹 ENSURE REWARD STARTS FROM 50
        int currentPoints = user.getRewardPoints() == null ? 10 : user.getRewardPoints();
        user.setRewardPoints(currentPoints + rewardEarned);

        userRepo.save(user);

        EnergyUsage usage = new EnergyUsage();
        usage.setUnitsConsumed(unitsConsumed);
        usage.setBillAmount(billAmount);
        usage.setDate(LocalDate.now());
        usage.setUser(user);

        return energyRepo.save(usage);
    }
    public int getRewardPoints(String username) {

        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return user.getRewardPoints() == null ? 10 : user.getRewardPoints();
    }




    // ✅ VIEW ALL
    public List<EnergyUsage> getAllUsage() {
        return energyRepo.findAll();
    }

    // ✅ USER HISTORY
    public List<EnergyUsage> getUsageByUser(String username) {
        return energyRepo.findByUserUsername(username);
    }
}
