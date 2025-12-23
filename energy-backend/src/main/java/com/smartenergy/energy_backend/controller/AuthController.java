package com.smartenergy.energy_backend.controller;

import com.smartenergy.energy_backend.dto.LoginRequest;
import com.smartenergy.energy_backend.dto.LoginResponse;
import com.smartenergy.energy_backend.model.User;
import com.smartenergy.energy_backend.security.JwtUtil;
import com.smartenergy.energy_backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    // ✅ CONSTRUCTOR INJECTION (IMPORTANT)
    public AuthController(
            UserService userService,
            AuthenticationManager authenticationManager,
            JwtUtil jwtUtil
    ) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    // ✅ REGISTER
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.register(user);
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        String token = jwtUtil.generateToken(request.getUsername());

        return ResponseEntity.ok(
                new LoginResponse(token, request.getUsername())
        );
    }
}
