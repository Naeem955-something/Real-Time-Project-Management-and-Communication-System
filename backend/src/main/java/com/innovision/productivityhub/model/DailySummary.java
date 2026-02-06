package com.innovision.productivityhub.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "daily_summaries")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class DailySummary extends BaseEntity {
    private String title;

    @Column(length = 2000)
    private String content;

    private long completedLast24h;
    private long newTasksLast24h;
    private long pendingTasks;
    private long upcomingDeadlines;
    private long activityCount;

    // Explicit getters for compatibility and clarity
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public long getCompletedLast24h() {
        return completedLast24h;
    }

    public void setCompletedLast24h(long completedLast24h) {
        this.completedLast24h = completedLast24h;
    }

    public long getNewTasksLast24h() {
        return newTasksLast24h;
    }

    public void setNewTasksLast24h(long newTasksLast24h) {
        this.newTasksLast24h = newTasksLast24h;
    }

    public long getPendingTasks() {
        return pendingTasks;
    }

    public void setPendingTasks(long pendingTasks) {
        this.pendingTasks = pendingTasks;
    }

    public long getUpcomingDeadlines() {
        return upcomingDeadlines;
    }

    public void setUpcomingDeadlines(long upcomingDeadlines) {
        this.upcomingDeadlines = upcomingDeadlines;
    }

    public long getActivityCount() {
        return activityCount;
    }

    public void setActivityCount(long activityCount) {
        this.activityCount = activityCount;
    }
}
