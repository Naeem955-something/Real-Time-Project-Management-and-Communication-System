package com.innovision.productivityhub.controller;

import com.innovision.productivityhub.service.AnalyticsService;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/overview")
    public ResponseEntity<Map<String, Object>> overview(
            @RequestParam(defaultValue = "6") int months,
            @RequestParam(name = "activityDays", defaultValue = "14") int activityDays) {
        return ResponseEntity.ok(analyticsService.getOverview(months, activityDays));
    }
}
