package com.innovision.productivityhub.service;

import com.innovision.productivityhub.model.ActivityLog;
import com.innovision.productivityhub.model.Task;
import com.innovision.productivityhub.model.TaskStatus;
import com.innovision.productivityhub.repository.ActivityLogRepository;
import com.innovision.productivityhub.repository.ProjectRepository;
import com.innovision.productivityhub.repository.TaskRepository;
import java.time.Instant;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class AnalyticsService {
    private final TaskRepository taskRepository;
    private final ActivityLogRepository activityLogRepository;
    private final ProjectRepository projectRepository;

    public AnalyticsService(
            TaskRepository taskRepository,
            ActivityLogRepository activityLogRepository,
            ProjectRepository projectRepository) {
        this.taskRepository = taskRepository;
        this.activityLogRepository = activityLogRepository;
        this.projectRepository = projectRepository;
    }

    public Map<String, Object> getOverview(int months, int activityDays) {
        Map<String, Object> payload = new HashMap<>();

        payload.put("statusBreakdown", buildStatusBreakdown());
        payload.put("throughput", buildThroughput(months));
        payload.put("teamWorkload", buildTeamWorkload());

        Map<String, Object> activity = buildActivityTrend(activityDays);
        payload.putAll(activity);

        long totalTasks = taskRepository.count();
        long completedTasks = taskRepository.countByStatus(TaskStatus.DONE);
        double completionRate = totalTasks > 0 ? (double) completedTasks / totalTasks * 100 : 0;
        payload.put("totalTasks", totalTasks);
        payload.put("completedTasks", completedTasks);
        payload.put("completionRate", Math.round(completionRate));
        payload.put("activeProjects", projectRepository.count());

        return payload;
    }

    private Map<String, Long> buildStatusBreakdown() {
        Map<String, Long> status = new LinkedHashMap<>();
        status.put(TaskStatus.TODO.name(), taskRepository.countByStatus(TaskStatus.TODO));
        status.put(TaskStatus.IN_PROGRESS.name(), taskRepository.countByStatus(TaskStatus.IN_PROGRESS));
        status.put(TaskStatus.REVIEW.name(), taskRepository.countByStatus(TaskStatus.REVIEW));
        status.put(TaskStatus.DONE.name(), taskRepository.countByStatus(TaskStatus.DONE));
        return status;
    }

    private List<Map<String, Object>> buildThroughput(int months) {
        ZoneId zone = ZoneId.systemDefault();
        YearMonth start = YearMonth.now().minusMonths(Math.max(months - 1, 0));
        Instant cutoff = start.atDay(1).atStartOfDay(zone).toInstant();

        List<Task> tasks = taskRepository.findByCreatedAtAfter(cutoff);

        Map<YearMonth, Long> createdByMonth = tasks.stream()
                .collect(Collectors.groupingBy(
                        task -> YearMonth.from(task.getCreatedAt().atZone(zone)), Collectors.counting()));
        Map<YearMonth, Long> completedByMonth = tasks.stream()
                .filter(t -> t.getStatus() == TaskStatus.DONE)
                .collect(Collectors.groupingBy(
                        task -> YearMonth.from(task.getCreatedAt().atZone(zone)), Collectors.counting()));

        List<Map<String, Object>> series = new ArrayList<>();
        for (int i = 0; i < months; i++) {
            YearMonth current = start.plusMonths(i);
            Map<String, Object> point = new HashMap<>();
            point.put("period", current.toString());
            point.put("label", current.getMonth().getDisplayName(java.time.format.TextStyle.SHORT, Locale.ENGLISH));
            point.put("created", createdByMonth.getOrDefault(current, 0L));
            point.put("completed", completedByMonth.getOrDefault(current, 0L));
            series.add(point);
        }
        return series;
    }

    private List<Map<String, Object>> buildTeamWorkload() {
        List<Object[]> rows = taskRepository.countTasksByTeam();
        return rows.stream()
                .map(row -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("team", row[0]);
                    map.put("tasks", ((Number) row[1]).longValue());
                    return map;
                })
                .collect(Collectors.toList());
    }

    private Map<String, Object> buildActivityTrend(int days) {
        ZoneId zone = ZoneId.systemDefault();
        LocalDate startDate = LocalDate.now().minusDays(Math.max(days - 1, 0));
        Instant cutoff = startDate.atStartOfDay(zone).toInstant();
        List<ActivityLog> logs = activityLogRepository.findByCreatedAtAfter(cutoff);

        Map<LocalDate, Long> grouped = logs.stream()
                .collect(Collectors.groupingBy(log -> log.getCreatedAt().atZone(zone).toLocalDate(), Collectors.counting()));

        List<Map<String, Object>> trend = new ArrayList<>();
        for (int i = 0; i < days; i++) {
            LocalDate day = startDate.plusDays(i);
            Map<String, Object> point = new HashMap<>();
            point.put("date", day.toString());
            point.put("events", grouped.getOrDefault(day, 0L));
            trend.add(point);
        }

        Map<String, Object> activity = new HashMap<>();
        activity.put("activityTrend", trend);
        activity.put("activityTotal", logs.size());
        return activity;
    }
}
