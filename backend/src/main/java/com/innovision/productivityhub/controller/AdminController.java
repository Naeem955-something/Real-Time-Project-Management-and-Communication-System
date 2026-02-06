package com.innovision.productivityhub.controller;

import com.innovision.productivityhub.model.Role;
import com.innovision.productivityhub.model.User;
import com.innovision.productivityhub.repository.ActivityLogRepository;
import com.innovision.productivityhub.service.UserService;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserService userService;
    private final ActivityLogRepository activityLogRepository;

    public AdminController(UserService userService, ActivityLogRepository activityLogRepository) {
        this.userService = userService;
        this.activityLogRepository = activityLogRepository;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> listUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    @PutMapping("/users/{id}/role")
    public ResponseEntity<User> updateRole(@PathVariable Long id, @RequestBody Map<String, String> body) {
        Role role = Role.valueOf(body.getOrDefault("role", "MEMBER"));
        return ResponseEntity.ok(userService.updateRole(id, role));
    }

    @GetMapping("/activity")
    public ResponseEntity<?> recentActivity(@RequestParam(defaultValue = "20") int limit) {
        return ResponseEntity.ok(activityLogRepository.findAllByOrderByCreatedAtDesc(PageRequest.of(0, limit)));
    }
}
