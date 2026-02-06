package com.innovision.productivityhub.controller;

import com.innovision.productivityhub.service.ExportService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/export")
public class ExportController {

    private final ExportService exportService;

    public ExportController(ExportService exportService) {
        this.exportService = exportService;
    }

    @GetMapping("/board/{projectId}")
    public ResponseEntity<String> exportBoard(@PathVariable Long projectId) {
        String csv = exportService.exportBoardCsv(projectId);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=board-" + projectId + ".csv")
                .contentType(MediaType.TEXT_PLAIN)
                .body(csv);
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<String> exportProject(@PathVariable Long projectId) {
        String markdown = exportService.exportProjectSummary(projectId);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=project-" + projectId + "-summary.md")
                .contentType(MediaType.TEXT_PLAIN)
                .body(markdown);
    }
}
