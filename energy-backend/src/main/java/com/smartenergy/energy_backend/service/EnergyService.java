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

    private final EnergyUsageRepository energyUsageRepository;
    private final UserRepository userRepository;

    public EnergyService(
            EnergyUsageRepository energyUsageRepository,
            UserRepository userRepository
    ) {
        this.energyUsageRepository = energyUsageRepository;
        this.userRepository = userRepository;
    }

    public EnergyUsage addUsage(Double unitsConsumed, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        double billAmount = calculateBill(unitsConsumed);
        int rewardEarned = calculateReward(unitsConsumed);

        // ✅ Safe reward handling
        int currentPoints = user.getRewardPoints() == null ? 50 : user.getRewardPoints();
        user.setRewardPoints(currentPoints + rewardEarned);
        userRepository.save(user);

        EnergyUsage usage = new EnergyUsage();
        usage.setUnitsConsumed(unitsConsumed);
        usage.setBillAmount(billAmount);
        usage.setDate(LocalDate.now());
        usage.setUser(user);

        return energyUsageRepository.save(usage);
    }

    // ✅ VIEW ALL (for testing / admin)
    public List<EnergyUsage> getAllUsage() {
        return energyUsageRepository.findAll();
    }

    // ✅ USER HISTORY
    public List<EnergyUsage> getUsageByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return energyUsageRepository.findByUser(user);
    }

    // ✅ GET REWARD POINTS BY EMAIL
    public int getRewardPointsByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getRewardPoints();
    }

    // 🔢 BILL CALCULATION
    private double calculateBill(double units) {
        if (units <= 100) return units * 2;
        else if (units <= 200) return (100*2) + (units-100)*3;
        else return (100 * 2) + (100 * 3) + (units - 200) * 5;
    }

    // 🎁 REWARD LOGIC (LOW USAGE = HIGH REWARD)
    private int calculateReward(double units) {
        if (units <= 100) return 100;
        else if (units <= 200) return 50;
        else return 10;
    }

}
