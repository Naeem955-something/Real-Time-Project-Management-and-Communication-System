package com.innovision.productivityhub.service;

import com.innovision.productivityhub.dto.MessagePayload;
import com.innovision.productivityhub.model.Message;
import com.innovision.productivityhub.model.Project;
import com.innovision.productivityhub.model.User;
import com.innovision.productivityhub.repository.MessageRepository;
import com.innovision.productivityhub.repository.ProjectRepository;
import com.innovision.productivityhub.repository.UserRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class MessageService {
    private final MessageRepository messageRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public MessageService(MessageRepository messageRepository, ProjectRepository projectRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public Message save(MessagePayload payload, String senderEmail) {
        Project project = payload.projectId() != null ? projectRepository.findById(payload.projectId()).orElse(null) : null;
        User sender = senderEmail != null ? userRepository.findByEmail(senderEmail).orElse(null) : null;

        Message message = new Message();
        message.setContent(payload.content());
        message.setChannel(payload.channel());
        message.setProject(project);
        message.setSender(sender);
        return messageRepository.save(message);
    }

    public List<Message> recentByProject(Long projectId) {
        return messageRepository.findByProjectIdOrderByCreatedAtDesc(projectId);
    }
}
