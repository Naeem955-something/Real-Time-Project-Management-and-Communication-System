package com.innovision.productivityhub.scheduler;

import com.innovision.productivityhub.model.NotificationType;
import com.innovision.productivityhub.model.Task;
import com.innovision.productivityhub.repository.TaskRepository;
import com.innovision.productivityhub.service.NotificationService;
import java.time.LocalDate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class DeadlineMonitorScheduler {
    private static final Logger log = LoggerFactory.getLogger(DeadlineMonitorScheduler.class);

    private final TaskRepository taskRepository;
    private final NotificationService notificationService;

    public DeadlineMonitorScheduler(TaskRepository taskRepository, NotificationService notificationService) {
        this.taskRepository = taskRepository;
        this.notificationService = notificationService;
    }

    // Check every hour for tasks due within 24 hours
    @Scheduled(cron = "0 0 * * * *")
    public void monitorDeadlines() {
        LocalDate tomorrow = LocalDate.now().plusDays(1);
        taskRepository.findAll().stream()
            .filter(task -> task.getDueDate() != null && !task.getAssignees().isEmpty())
            .filter(task -> !task.getDueDate().isAfter(tomorrow))
            .forEach(this::notifyAssignees);
    }

    private void notifyAssignees(Task task) {
        task.getAssignees().forEach(user -> notificationService.notifyUser(
            user.getId(),
            "Upcoming deadline for task: " + task.getTitle(),
            NotificationType.DEADLINE
        ));
        log.info("Deadline notifications sent for task {}", task.getId());
    }
}
