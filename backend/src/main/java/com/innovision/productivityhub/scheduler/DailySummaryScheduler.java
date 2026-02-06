package com.innovision.productivityhub.scheduler;

import com.innovision.productivityhub.model.DailySummary;
import com.innovision.productivityhub.model.NotificationType;
import com.innovision.productivityhub.repository.UserRepository;
import com.innovision.productivityhub.service.DailySummaryService;
import com.innovision.productivityhub.service.NotificationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class DailySummaryScheduler {
    private static final Logger log = LoggerFactory.getLogger(DailySummaryScheduler.class);

    private final NotificationService notificationService;
    private final UserRepository userRepository;
    private final DailySummaryService dailySummaryService;

    public DailySummaryScheduler(
            NotificationService notificationService,
            UserRepository userRepository,
            DailySummaryService dailySummaryService) {
        this.notificationService = notificationService;
        this.userRepository = userRepository;
        this.dailySummaryService = dailySummaryService;
    }

    // Runs every day at 7 AM server time
    @Scheduled(cron = "0 0 7 * * *")
    public void sendDailySummary() {
        log.info("Triggering daily summary job for {} users", userRepository.count());
        DailySummary summary = dailySummaryService.generate();
        userRepository.findAll().forEach(user -> notificationService.notifyUser(
                user.getId(),
                "Daily summary ready: " + summary.getContent(),
                NotificationType.SYSTEM));
    }
}
