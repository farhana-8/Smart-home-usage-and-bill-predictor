package com.smartenergy.energy_backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(name = "reward_points", nullable = false)
    private Integer rewardPoints;

    @PrePersist
    public void prePersist() {
        if (rewardPoints == null) {
            rewardPoints = 0;
        }
    }
}
