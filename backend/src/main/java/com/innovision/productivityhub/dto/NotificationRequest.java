package com.innovision.productivityhub.dto;

import com.innovision.productivityhub.model.NotificationType;

public record NotificationRequest(Long recipientId, String message, NotificationType type, String link) {
}
