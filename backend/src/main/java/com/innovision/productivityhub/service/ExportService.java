package com.innovision.productivityhub.service;

import com.innovision.productivityhub.model.Project;
import com.innovision.productivityhub.model.Task;
import com.innovision.productivityhub.model.TaskStatus;
import com.innovision.productivityhub.repository.ProjectRepository;
import com.innovision.productivityhub.repository.TaskRepository;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class ExportService {
    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;

    public ExportService(TaskRepository taskRepository, ProjectRepository projectRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
    }

    public String exportBoardCsv(Long projectId) {
        List<Task> tasks = taskRepository.findByProjectId(projectId);
        StringBuilder sb = new StringBuilder();
        sb.append("id,title,status,priority,dueDate\n");
        tasks.forEach(task -> sb.append(String.join(",",
                String.valueOf(task.getId()),
                quote(task.getTitle()),
                task.getStatus().name(),
                task.getPriority().name(),
                task.getDueDate() != null ? task.getDueDate().toString() : ""
        )).append("\n"));
        return sb.toString();
    }

    public String exportProjectSummary(Long projectId) {
        Project project = projectRepository.findById(projectId).orElse(null);
        if (project == null) {
            return "Project not found";
        }
        List<Task> tasks = taskRepository.findByProjectId(projectId);
        Map<TaskStatus, Long> counts = tasks.stream()
                .collect(Collectors.groupingBy(Task::getStatus, Collectors.counting()));

        StringBuilder sb = new StringBuilder();
        sb.append("# Project Summary\n");
        sb.append("Name: ").append(project.getName()).append("\n");
        sb.append("Status: ").append(project.getStatus()).append("\n");
        if (project.getStartDate() != null) {
            sb.append("Start: ").append(project.getStartDate().format(DateTimeFormatter.ISO_DATE)).append("\n");
        }
        if (project.getEndDate() != null) {
            sb.append("End: ").append(project.getEndDate().format(DateTimeFormatter.ISO_DATE)).append("\n");
        }
        sb.append("\n## Tasks by status\n");
        for (TaskStatus status : TaskStatus.values()) {
            sb.append("- ").append(status.name()).append(": ").append(counts.getOrDefault(status, 0L)).append("\n");
        }
        sb.append("\n## Tasks\n");
        tasks.forEach(task -> sb.append("- [").append(task.getStatus()).append("] ")
                .append(task.getTitle())
                .append(task.getDueDate() != null ? " (due " + task.getDueDate() + ")" : "")
                .append("\n"));
        return sb.toString();
    }

    private String quote(String value) {
        if (value == null) return "";
        return "\"" + value.replace("\"", "'") + "\"";
    }
}
