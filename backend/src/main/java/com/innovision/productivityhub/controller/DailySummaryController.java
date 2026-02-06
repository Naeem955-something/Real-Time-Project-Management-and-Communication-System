package com.innovision.productivityhub.controller;

import com.innovision.productivityhub.model.DailySummary;
import com.innovision.productivityhub.service.DailySummaryService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/daily-summary")
public class DailySummaryController {

    private final DailySummaryService dailySummaryService;

    public DailySummaryController(DailySummaryService dailySummaryService) {
        this.dailySummaryService = dailySummaryService;
    }

    @GetMapping("/latest")
    public ResponseEntity<List<DailySummary>> latest(@RequestParam(defaultValue = "7") int limit) {
        return ResponseEntity.ok(dailySummaryService.latest(limit));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DailySummary> get(@PathVariable Long id) {
        DailySummary summary = dailySummaryService.get(id);
        return summary != null ? ResponseEntity.ok(summary) : ResponseEntity.notFound().build();
    }

    @PostMapping("/run")
    public ResponseEntity<DailySummary> runNow() {
        return ResponseEntity.ok(dailySummaryService.generate());
    }
}
