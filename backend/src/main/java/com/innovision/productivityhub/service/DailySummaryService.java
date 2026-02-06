package com.innovision.productivityhub.service;

import com.innovision.productivityhub.model.DailySummary;
import com.innovision.productivityhub.model.TaskStatus;
import com.innovision.productivityhub.repository.ActivityLogRepository;
import com.innovision.productivityhub.repository.DailySummaryRepository;
import com.innovision.productivityhub.repository.TaskRepository;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class DailySummaryService {
    private final TaskRepository taskRepository;
    private final ActivityLogRepository activityLogRepository;
    private final DailySummaryRepository dailySummaryRepository;

    public DailySummaryService(
            TaskRepository taskRepository,
            ActivityLogRepository activityLogRepository,
            DailySummaryRepository dailySummaryRepository) {
        this.taskRepository = taskRepository;
        this.activityLogRepository = activityLogRepository;
        this.dailySummaryRepository = dailySummaryRepository;
    }

    public DailySummary generate() {
        Instant now = Instant.now();
        Instant last24h = now.minusSeconds(24 * 60 * 60);
        ZoneId zone = ZoneId.systemDefault();

        long completed = taskRepository.countByStatusAndUpdatedAtAfter(TaskStatus.DONE, last24h);
        long newTasks = taskRepository.findByCreatedAtAfter(last24h).size();
        long pending = taskRepository.countByStatusInAndDueDateAfter(
                List.of(TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.REVIEW), LocalDate.now());
        long upcoming = taskRepository.findUpcomingTasks(LocalDate.now(), LocalDate.now().plusDays(7)).size();
        long activity = activityLogRepository.findByCreatedAtAfter(last24h).size();

        StringBuilder sb = new StringBuilder();
        sb.append("Completed: ").append(completed).append(" | ");
        sb.append("New: ").append(newTasks).append(" | ");
        sb.append("Pending: ").append(pending).append(" | ");
        sb.append("Due soon: ").append(upcoming).append(" | ");
        sb.append("Activity: ").append(activity);

        DailySummary summary = new DailySummary();
        summary.setTitle("Daily Summary");
        summary.setContent(sb.toString());
        summary.setCompletedLast24h(completed);
        summary.setNewTasksLast24h(newTasks);
        summary.setPendingTasks(pending);
        summary.setUpcomingDeadlines(upcoming);
        summary.setActivityCount(activity);

        return dailySummaryRepository.save(summary);
    }

    public List<DailySummary> latest(int limit) {
        List<DailySummary> summaries = dailySummaryRepository.findTop10ByOrderByCreatedAtDesc();
        return summaries.stream().limit(limit).toList();
    }

    public DailySummary get(Long id) {
        return dailySummaryRepository.findById(id).orElse(null);
    }
}
